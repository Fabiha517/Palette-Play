export const generateImageFromPollinations = async (
	prompt,
	referenceImageUrl,
	seed,
	variation,
	accessToken,
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
- Do NOT redraw, reinterpret, clean up, smooth, simplify, erase, merge, replace, or alter any line.
- Do not create photorealism.
- Do not make the outlines disappear.
- Do not add painterly details that were not present in the original drawing.
- The generated image must clearly follow the user's requested colours, mood and style.
- Preserve the original black ink outlines, line placement, contours,
- Do NOT add any objects, scenery, flowers, leaves, patterns, sparkles, decorative elements, shadows of objects, or new artwork to the background.
proportions, composition, shapes, and hand-drawn sketch quality.
- Do not redraw, reinterpret, simplify, smooth, or replace the line art.
- Keep the existing outlines clearly visible after coloring.
- The final image must still look like the same black-and-white coloring-book
sketch, but with color added.
- Allow slight color variation, visible paper texture,and subtle coloring within the original outlines.
- The original line art is the source of truth for all shapes and boundaries.


COLORED-PENCIL TECHNIQUE:
Make the coloring physically believable as colored-pencil artwork.
Use visible fine pencil strokes following the direction and shape of the original forms.
Build colors through multiple light layers rather than smooth digital fills.
Use subtle cross-hatching and natural pigment variation.
Leave tiny areas of paper visible where appropriate.
Create shadows through increased pencil pressure and layered pigment rather than digital gradients.
Do not make the coloring perfectly uniform.
The slight texture and variation of real colored pencil should remain visible.


LINE PRESERVATION:
The original black ink lines must remain completely separate and clearly readable.
Colored pencil must sit visually underneath the original ink lines.
Never let colored areas obscure, merge with, blur, or replace the black outlines.

FINAL RESULT:
The result should look like a professional artist took the EXACT ORIGINAL SKETCH and carefully colored it by hand with colored pencils.
It must retain the imperfect, delicate, hand-drawn character of the original sketch.
The magic should come entirely from the color choices and pencil technique — NOT from changing or adding anything to the artwork.



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
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		const errorText = await response.text();

		if (response.status === 401) {
			const error = new Error(
				"Your Pollinations connection is no longer valid.",
			);

			error.code = "POLLINATIONS_EXPIRED";
			throw error;
		}

		throw new Error(`Pollinations error ${response.status}: ${errorText}`);
	}

	return Buffer.from(await response.arrayBuffer());
};
