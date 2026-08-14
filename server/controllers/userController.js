import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import resend from "../config/resend.js";
export const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				message: "User already exists",
			});
		}
		if (!password) {
			return res.status(400).json({
				message: "Password is required.",
			});
		}
		if (password.length < 8) {
			return res.status(400).json({
				message: "Password must be at least 8 characters.",
			});
		}

		if (password.length > 64) {
			return res.status(400).json({
				message: "Password must not exceed 64 characters.",
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		res.status(201).json({
			message: "User created Succesfully",
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: "Signup failed",
		});
	}
};
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({
				message: "Invalid Password",
			});
		}

		const token = jwt.sign(
			{
				userId: user._id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			},
		);
		res.status(200).json({
			message: "Login Successful",
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				bio: user.bio,
				profileImage: user.profileImage,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		res.status(200).json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				bio: user.bio,
				profileImage: user.profileImage,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { username, bio } = req.body;
		const user = await User.findByIdAndUpdate(
			req.userId,
			{ username, bio },
			{
				returnDocument: "after",
				runValidators: true,
			},
		);

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		res.status(200).json({
			message: "Profile updated successfully",
			user,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: "Failed to update profile",
		});
	}
};
export const updateProfilePhoto = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				message: "No image uploaded",
			});
		}

		const result = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					folder: "palette-play/profile-images",
					resource_type: "image",
				},
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				},
			);

			stream.end(req.file.buffer);
		});

		const user = await User.findByIdAndUpdate(
			req.userId,
			{
				profileImage: result.secure_url,
			},
			{
				returnDocument: "after",
				runValidators: true,
			},
		);

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		res.status(200).json({
			message: "Profile photo updated successfully",
			user,
		});
	} catch (error) {
		console.error("Profile photo upload error:", error);

		res.status(500).json({
			message: "Failed to update profile photo",
		});
	}
};

export const changePassword = async (req, res) => {
	try {
		const { currentPassword, newPassword } = req.body;
		if (!currentPassword || !newPassword) {
			return res.status(400).json({
				message: "Current password and new password are required.",
			});
		}
		if (newPassword.length < 8) {
			return res.status(400).json({
				message: "New password must be at least 8 characters.",
			});
		}
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found.",
			});
		}

		const isMatch = await bcrypt.compare(currentPassword, user.password);
		if (!isMatch) {
			return res.status(401).json({
				message: "Current password is incorrect.",
			});
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		await user.save();

		res.status(200).json({
			message: "Password changed successfully.",
		});
	} catch (error) {
		console.error("Change password error:", error);

		res.status(500).json({
			message: "Failed to change password.",
		});
	}
};

export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({
				message: "Email is required",
			});
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: "No account found with this email.",
			});
		}
		const resetToken = crypto.randomBytes(32).toString("hex");
		const hashedResetToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");
		user.resetPasswordToken = hashedResetToken;
		user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
		await user.save();
		const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
		await resend.emails.send({
			from: "Palette Play <onboarding@resend.dev>",
			to: email,
			subject: "Password reset request",
			html: `
			 <h2 >Reset Your Password?</h2>
			 <p>If you requested a password reset for Palette Play, click the button below to complete the process. If you didn't make this request, you can safely ignore this email.</p>
			  <a
          href="${resetLink}"
          style="
          display: inline-block;
          padding: 12px 20px;
          background: #7C6AE8;
          color: white;
          text-decoration: none;
          border-radius: 10px;">
           Reset Password
          </a>
					 <p>This link will expire in 15 minutes. </p>
			`,
		});
		return res.status(200).json({
			message: "Password reset email sent.",
		});
	} catch (error) {
		console.error("Forgot password error:", error);

		return res.status(500).json({
			message: "Failed to send password reset email.",
		});
	}
};
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { newPassword } = req.body;
		if (!token) {
			return res.status(400).json({
				message: "Reset token is required.",
			});
		}

		if (!newPassword) {
			return res.status(400).json({
				message: "New password is required.",
			});
		}

		if (newPassword.length < 8) {
			return res.status(400).json({
				message: "Password must be at least 8 characters.",
			});
		}
		if (newPassword.length > 64) {
			return res.status(400).json({
				message: "Password must not exceed 64 characters.",
			});
		}

		const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
		const user = await User.findOne({
			resetPasswordToken: hashedToken,
			resetPasswordExpires: { $gt: new Date() },
		});
		if (!user) {
			return res.status(400).json({
				message: "Reset link is invalid or has expired",
			});
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		user.resetPasswordToken = null;
		user.resetPasswordExpires = null;
		await user.save();
		return res.status(200).json({
			message: "Password reset successfully.",
		});
	} catch (error) {
		console.error("Reset password error:", error);
		return res.status(500).json({
			message: "Failed to reset password .",
		});
	}
};
