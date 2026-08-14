import fs from "fs/promises";
import path from "path";
export const generateImageFromPollinations = async (
	prompt,
	referenceImageUrl,
	seed,
	variation,
) => {
	
	
	const fullPrompt = `
Color this clean line art accurately and professionally.

USER'S COLORING REQUEST:
${prompt}

IMPORTANT:
- Preserve the original composition, character design, pose, and exact line structure.
- Keep the original black lines clearly visible.
- Do not redraw or redesign the character.
- Do not change the structure of the line art.
- Do not turn the image into a polished digital painting.
- Do not create photorealism.
- Do not make the outlines disappear.
- Do not add painterly details that were not present in the original drawing.
- The generated image must clearly follow the user's requested colours, mood and style.
- Preserve the original black ink outlines, line placement, contours,
proportions, composition, shapes, and hand-drawn sketch quality.
- Do not redraw, reinterpret, simplify, smooth, or replace the line art.
- Keep the existing outlines clearly visible after coloring.
- The final image must still look like the same black-and-white coloring-book
sketch, but with color added.
- Allow slight color variation, visible paper texture,and subtle coloring within the original outlines.
- The original line art is the source of truth for all shapes and boundaries.
VARIATION:
${variation}

Create a distinct interpretation of the requested colouring while keeping
the same original line art and composition.
The versions can vary with respect to the background color and effect
Clean professional coloring.
No unwanted glow, neon, oversaturation, or artificial lighting effects
unless specifically requested by the user.
`.trim();

	const params = new URLSearchParams({
		model: "gpt-image-2",
		image: referenceImageUrl,
		width: "1024",
		height: "1024",
		seed: String(seed),
		nologo: "true",
	});

	const url =
		`https://gen.pollinations.ai/image/` +
		`${encodeURIComponent(fullPrompt)}?${params.toString()}`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`,
		},
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Pollinations error ${response.status}: ${errorText}`);
	}

	return Buffer.from(await response.arrayBuffer());
};
