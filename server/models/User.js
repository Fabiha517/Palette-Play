import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
			default: "Digital artist creating stories through colors",
		},
		profileImage: {
			type: String,
			default: "",
		},
		pollinations: {
			accessToken: {
				type: String,
				default: null,
			},
			expiresAt: {
				type: Date,
				default: null,
			},
		},
		resetPasswordToken: {
			type: String,
			default: null,
		},
		resetPasswordExpires: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);
export default mongoose.model("User", userSchema);
