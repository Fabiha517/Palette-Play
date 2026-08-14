import mongoose from "mongoose";
const versionSchema = new mongoose.Schema(
	{
		prompt: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);
const projectSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
		},

		originalImage: {
			type: String,
			required: true,
		},
		currentPrompt: {
			type: String,
			required: true,
		},
		versions: [versionSchema],
	},
	{
		timestamps: true,
	},
);
export default mongoose.model("Project", projectSchema);
