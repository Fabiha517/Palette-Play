import { generateImageFromPollinations } from "../services/pollinationsService.js";
import { uploadBufferToCloudinary } from "./imageController.js";
export const generateImages = async (req, res) => {
	try {
		const { prompt, referenceImageUrl } = req.body;

		if (!prompt || !referenceImageUrl) {
			return res.status(400).json({
				message: "Prompt and reference image are required",
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
                variations[i]
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
		console.error("Generation error:", error);

		res.status(500).json({
			message: "Image generation failed",
			error: error.message,
		});
	}
};
