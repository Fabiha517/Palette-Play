import { generateImageFromPollinations } from "../services/pollinationsService.js";
import { uploadBufferToCloudinary } from "./imageController.js";
import {
	generateCodeVerifier,
	generateCodeChallenge,
	generateState,
} from "../utils/pollinationsOAuth.js";
import oauthStore from "../utils/pollinationsOAuthStore.js";
import User from "../models/User.js";

export const generateImages = async (req, res) => {
	let user
	try {
		const { prompt, referenceImageUrl } = req.body;

		if (!prompt || !referenceImageUrl) {
			return res.status(400).json({
				message: "Prompt and reference image are required",
			});
		}
		 user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const pollinations = user.pollinations || {};
		if (!pollinations.accessToken) {
			return res.status(403).json({
				code: "POLLINATIONS_AUTH_REQUIRED",
				message: "Connect your Pollinations account before generating images.",
			});
		}
		if (
	pollinations.expiresAt &&
	pollinations.expiresAt <= new Date()
) {
	return res.status(403).json({
		code: "POLLINATIONS_EXPIRED",
		message: "Your Pollinations connection has expired. Please reconnect.",
	});
}
		const images = [];

		const variations = [
			"Use a soft pastel colour palette with gentle, harmonious colours.",
			"Use a slightly more vibrant but still tasteful colour palette with different colour combinations.",
		];
		for (let i = 0; i < 2; i++) {
			const seed = Math.floor(Math.random() * 999999);

			const imageBuffer = await generateImageFromPollinations(
				prompt,
				referenceImageUrl,
				seed,
				variations[i],
				pollinations.accessToken
			);

			const cloudinaryResult = await uploadBufferToCloudinary(imageBuffer);

			images.push({
				imageUrl: cloudinaryResult.secure_url,
				seed,
			});
		}

		res.status(200).json({
			message: "Images generated successfully",
			images,
		});
	} catch (error) {
		if (error.code === "POLLINATIONS_EXPIRED") {
		user.pollinations = {
			accessToken: null,
			expiresAt: null,
		};

		await user.save();

		return res.status(403).json({
			code: "POLLINATIONS_EXPIRED",
			message:
				"Your Pollinations connection is no longer valid. Please reconnect.",
		});
	}
	throw error
	}
};

export const connectPollinations = async (req, res) => {
	try {
		const codeVerifier = generateCodeVerifier();
		const codeChallenge = generateCodeChallenge(codeVerifier);
		const state = generateState();
		oauthStore.set(state, {
			userId: req.userId,
			codeVerifier,
			createdAt: Date.now(),
		});

		const params = new URLSearchParams({
			response_type: "code",
			client_id: process.env.POLLINATIONS_APP_KEY,
			redirect_uri: process.env.POLLINATIONS_REDIRECT_URI,
			scope: "profile usage",
			state,
			code_challenge: codeChallenge,
			code_challenge_method: "S256",
		});

		const authorizationUrl = `https://enter.pollinations.ai/authorize?${params.toString()}`;
		res.json({ authorizationUrl });
	} catch (error) {
		console.error("Pollinations connect error", error);
		res.status(500).json({
			message: "Could not start Pollinations authorization",
		});
	}
};

export const pollinationsCallback = async (req, res) => {
	try {
		const { code, state } = req.query;
		if (!code || !state) {
			return res.status(400).send("Missing OAuth code or state");
		}

		const oauthData = oauthStore.get(state);

		if (!oauthData) {
			return res.status(400).send("Invalid or expired OAuth data");
		}
		const { userId, codeVerifier } = oauthData;

		oauthStore.delete(state);

		const tokenResponse = await fetch(
			"https://enter.pollinations.ai/api/oauth/token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					grant_type: "authorization_code",
					code,
					client_id: process.env.POLLINATIONS_APP_KEY,
					redirect_uri: process.env.POLLINATIONS_REDIRECT_URI,
					code_verifier: codeVerifier,
				}),
			},
		);

		const tokenData = await tokenResponse.json();
		if (!tokenResponse.ok) {
			return res.status(400).json({
				message: "Failed to exchnage pollinations authorization code",
				error: tokenData,
			});
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.pollinations = {
			accessToken: tokenData.access_token,
			expiresAt: tokenData.expires_in
				? new Date(Date.now() + tokenData.expires_in * 1000)
				: null,
		};
		await user.save();


res.redirect(
	`${process.env.FRONTEND_URL}/home?pollinations=connected`
)
	} catch (error) {
		console.error("Pollinations callback error:", error);

		res.status(500).send("Pollinations authorization failed");
	}
};

export const getPollinationsStatus = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		const pollinations = user.pollinations;
		// Never Connected
		if (!pollinations?.accessToken) {
			return res.json({
				connected: false,
				expired: false,
			});
		}
		//Token expired
		if (pollinations.expiresAt && pollinations.expiresAt <= new Date()) {
			return res.json({ connected: false, expired: true });
		}
		//Connected and not expired
		return res.json({ connected: true, expired: false });
	} catch (error) {
		console.error("Pollinations status error:", error);

		return res.status(500).json({
			message: "Failed to check Pollinations status",
		});
	}
};
