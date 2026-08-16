import { useEffect, useState,useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import purpleSplash from "../assets/images/purpleSplash.png";
import blueSplash from "../assets/images/blueSplash.png";
import splash from "../assets/images/splash.png";
import leftLeaf from "../assets/images/leftLeaf.png";
import rightLeaf from "../assets/images/rightLeaf.png";
import useProjectStore from "../store/useProjectStore";
import SplashEffect from "../components/SplashEffect"
import { connectPollinations } from "../../services/api";
import {
	createProject,
	generateImages,
	addProjectVersion,
} from "../../services/api";

export const Loading = () => {
	const navigate = useNavigate();
	const location = useLocation();
const generationStarted = useRef(false);
	const setCreatedProject = useProjectStore((state) => state.setCreatedProject);
	const addNewVersion = useProjectStore((state) => state.addNewVersion);
	const currentProject = useProjectStore((state) => state.currentProject);

	const [error, setError] = useState(null);
	
	const prompt = location.state?.prompt;
	const imageUrl = location.state?.imageUrl;
	const regenerate = location.state?.regenerate ?? false;
	const title = location.state?.title;
	const projectId = location.state?.projectId;
	useEffect(() => {
		if (!prompt || !imageUrl) return;
 if (generationStarted.current) {
        console.log(" Generation already started, skipping duplicate call");
        return;
    }
		let cancelled = false;

		const generate = async () => {
			try {
				const generationResponse = await generateImages(prompt, imageUrl);

				if (cancelled) return;

				const generatedImages = generationResponse.images;

				if (!generatedImages || generatedImages.length === 0) {
					throw new Error("No images were generated.");
				}

				console.log("Generated images:", generatedImages);

				if (regenerate) {
					    if (!projectId) {
        throw new Error("No project found for regeneration.");
    }	

					for (const generated of generatedImages) {
						if (cancelled) return;

						const version = {
							prompt,
							image: generated.imageUrl,
						};
		

						const response = await addProjectVersion(
							projectId,
							version,
						);

						if (cancelled) return;

					
						addNewVersion(response.version);
					}

					if (cancelled) return;

					navigate("/results", {
						state: {
							regenerate: true,
						},
						replace: true,
					});

					return;
				}

				const versions = generatedImages.map((generated) => ({
					prompt,
					image: generated.imageUrl,
				}));

				const project = {
					title: title,

					originalImage: imageUrl,

					currentPrompt: prompt,

					createdAt: new Date().toISOString(),

					versions,
				};

				//Save project in database
				const data = await createProject(project);

				if (cancelled) return;

				console.log("Project created:", data.project);

				// Save project in Zustand
				setCreatedProject(data.project);

				navigate("/results", {
					state: {
						regenerate: false,
					},
					replace: true,
				});
			} catch (err) {
				if (cancelled) return;

				console.error("Generation failed:", err);

				setError({
					code: err.code,
					message:
						err.message || "Something went wrong while creating your artwork.",
				});
			}
		};

		generate();

		return () => {
			cancelled = true;
		};
	}, [
		prompt,
		imageUrl,
		regenerate,
		projectId,
		navigate,
		setCreatedProject,
		addNewVersion,
		title,
	]);

	if (!prompt || !imageUrl) {
		return (
			<main className="min-h-screen bg-[#fbebd7] flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-3xl font-serif text-[#503125]">
						No generation found
					</h1>

					<button
						onClick={() => navigate("/home")}
						className="mt-5 px-6 py-3 rounded-2xl bg-[#7C6AE8] text-white cursor-pointer">
						Go Home
					</button>
				</div>
			</main>
		);
	}

	if (error) {
		const isPollinationsAuthError =
			error.code === "POLLINATIONS_AUTH_REQUIRED" ||
			error.code === "POLLINATIONS_EXPIRED";
		const isExpired = error.code === "POLLINATIONS_EXPIRED";
		const isGenerationUnavailable =
		error.code === "GENERATION_UNAVAILABLE";
		return (
			<main className="relative z-10 min-h-screen bg-[#fbebd7] flex items-center justify-center overflow-hidden">
				<div className="relative z-10 text-center px-6 max-w-lg">
					<h1 className="text-4xl font-serif text-[#503125]">Oops!</h1>
					<h2 className="mt-5 text-2xl font-semibold text-[#503125]">
						{isExpired
		? "Your Pollinations connection expired"
		: error.code === "POLLINATIONS_AUTH_REQUIRED"
			? "Connect your Pollinations account"
			: isGenerationUnavailable
				? "Image generation is temporarily unavailable"
				: "Something went wrong"}
					</h2>
					<p className="mt-4 text-lg leading-8 text-[#6D5C52]">
					{isExpired
		? "Your Pollinations authorization has expired. Reconnect your account to continue generating images with your own Pollen."
		: error.code === "POLLINATIONS_AUTH_REQUIRED"
			? "Connect your Pollinations account to generate images using your own Pollen."
			: isGenerationUnavailable
				? "The image generation service is temporarily unavailable. Please try again in a moment."
				: error.message}
					</p>
					{isPollinationsAuthError && (
						<button
							onClick={async () => {
								try {
													const data = await connectPollinations();
													window.location.href = data.authorizationUrl;
												} catch (error) {
													console.error("Pollinations connection failed:", error);
												}
							}}
							className="mt-7 px-8 py-4 rounded-2xl text-white font-semibold bg-linear-to-r from-[#D96A57] to-[#7C6AE8] hover:scale-[1.02] transition">
							Connect Pollinations
						</button>
					)}

					<button
						onClick={() => navigate("/home")}
						className="block mx-auto mt-4 px-7 py-3 rounded-2xl border border-[#E8D8C7] text-[#503125]">
						Back Home
					</button>
				</div>
				<SplashEffect/>
			</main>
		);
	}
	return (
		<main className="relative h-screen bg-[#fbebd7] z-10 overflow-hidden">
	
			<div className="max-w-6xl mx-auto h-full px-6 py-6 flex flex-col">
				{/* Header */}
				<div className="shrink-0">
					<h1 className="text-5xl font-serif text-center text-[#3E2A22]">
						Creating your masterpiece...
					</h1>

					<p className="text-center mt-3 text-[#6D5C52]">
						This may take a few moments. Our AI is carefully adding colors while
						keeping every detail.
					</p>
				</div>

				{/* Main images */}
				<div
					className="
			mt-8
			flex-1
			min-h-[60vh]
			grid
			md:grid-cols-2
			gap-8
		">
					{/* Original */}
					<div className="min-h-0 flex flex-col items-center">
						<h2 className="mb-3 text-xl font-semibold text-[#503125] shrink-0">
							Original
						</h2>

						<div
							className="
					flex-1
					min-h-0
					rounded-3xl
					overflow-hidden
				">
							<img
								src={imageUrl}
								className="
							w-full
							h-full	
							object-contain
							rounded-3xl
						"
							/>
						</div>
					</div>

					{/* Generating */}
					<div className="min-h-0 flex flex-col items-center">
						<h2 className="mb-3 text-xl font-semibold text-[#503125] shrink-0">
							Generating...
						</h2>

						<div
							className="
					flex-1
					min-h-0
					rounded-3xl
				
					animate-pulse
					overflow-hidden
					flex
					items-center
					justify-center
				">
							<img
								src={imageUrl}
								className="
							w-full
							h-full
							object-contain
							rounded-3xl
							opacity-60
						"
							/>
						</div>
					</div>
				</div>

				{/* Thumbnails */}
				<div
					className="
			shrink-0
			mt-5
			flex
			justify-center
			gap-4
		">
					<img src={imageUrl} className="w-16 h-16 rounded-xl object-cover" />

					{[1, 2, 3, 4].map((i) => (
						<img
							key={i}
							src={imageUrl}
							className="w-16 h-16 rounded-xl object-cover animate-pulse border border-[#E8D8C7]"
						/>
					))}
				</div>
			</div>

			<div className="absolute -right-50 -top-20 -z-10 pointer-events-none">
				<img src={splash} className="w-[50vw]" alt="" />
			</div>

			<div className="absolute -left-50 -top-20 -z-10 pointer-events-none">
				<img src={purpleSplash} className="w-[50vw] opacity-50" alt="" />
			</div>

			<div className="absolute -right-100 -bottom-40 -z-10 pointer-events-none">
				<img src={blueSplash} className="w-[50vw] opacity-70" alt="" />
			</div>

			<div className="absolute -left-80 -bottom-40 -z-10 pointer-events-none">
				<img src={blueSplash} className="w-[50vw] opacity-70" alt="" />
			</div>

			<div className="absolute left-0 -bottom-10 -z-10 pointer-events-none">
				<img src={leftLeaf} alt="" />
			</div>

			<div className="absolute right-0 bottom-0 -z-10 pointer-events-none">
				<img src={rightLeaf} alt="" />
			</div>

			<div className="absolute left-10 -bottom-50 -z-10 pointer-events-none">
				<img src={leftLeaf} alt="" />
			</div>
		</main>
	);
};
