	import { useRef } from "react";
	import { useNavigate } from "react-router-dom";
	import { uploadImage } from "../../services/api";
import { connectPollinations } from "../../services/api";

	const PromptSection = ({
		title,
		setTitle,
		prompt,
		setPrompt,
		promptError,
		setImageError,
		setPromptError,
		image,
		titleError,
		setTitleError,
		currentProject
	}) => {
		const ref = useRef(null);
		const navigate = useNavigate();
		const handleChange = (e) => {
			setPrompt(e.target.value);
			const textarea = ref.current;
			textarea.style.height = "auto";
			textarea.style.height = textarea.scrollHeight + "px";
		};

			const handleConnectPollinations = async () => {
				try {
					const data = await connectPollinations();
					window.location.href = data.authorizationUrl;
				} catch (error) {
					console.error("Pollinations connection failed:", error);
				}
			};
		const handleGenerate = async () => {
			let valid = true;

			if (!image) {
				setImageError(true);
				valid = false;
			} else {
				setImageError(false);
			}
			if(!title.trim()){
				setTitleError(true)
				valid=false
			}else{
				setTitleError(false)
			}

			if (!prompt.trim()) {
				setPromptError(true);
				valid = false;
			} else {
				setPromptError(false);
			}

			if (!valid) return;
			try {
				
			
				const uploadResponse=await uploadImage(image)
				const imageUrl=uploadResponse.imageUrl

				
				navigate("/loading", {
					state: {
						title:title.trim(),
						prompt,
						imageUrl,
						regenerate: false,
					  projectId: currentProject?._id,
					},
				});
			} catch (err) {
				console.error(err);
			}
		};
		return (
			<div className="rounded-3xl border border-[#E8D8C7] bg-[#FFF8F1] p-5  mb-8 ">
				<div className="mb-5">
					<label className="block text-lg font-medium text-[#503125] mb-2 pl-2">
						Project Title
					</label>
						<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						maxLength={60}
						placeholder="Example: Moonlit Forest"
						className=
						{`w-full
							rounded-3xl
							border
							border-[#E8D8C7]
							bg-[#FFF8F1]
							px-6
							py-4
							text-[17px]
							text-[#4B2F24]
							placeholder:text-[#B8A79B]
							focus:outline-none
							focus:border-[#D89B72]
							${
									titleError
										? "border-2 border-[#C86B47]"
										: "border border-[#E8D8C7]"
								}	
							`}
						
					/>
				{titleError ? (
					<p className=" text-[#C86B47] text-sm">
						Enter image title
					</p>
				) : (
					<p className=" text-[#C86B47] text-sm invisible">
						Enter image title
					</p>
				)}
					
					</div>
				<h2 className="text-2xl font-semibold text-[#503125] pb-4 pl-7">
					Describe your vision
				</h2>

				<textarea
					value={prompt}
					onChange={handleChange}
				
					ref={ref}
					placeholder="Example: serene evening, cool blue tones,	 magical atmosphere..."
					className={`
						w-full overflow-hidden resize-none rounded-3xl border border-[#E8D8C7] bg-[#FFF8F1] px-6 py-5 text-[17px] leading-8 text-[#4B2F24] placeholder:text-[#B8A79B] focus:outline-none focus:border-[#D89B72] transition
							${
									promptError
										? "border-2 border-[#C86B47]"
										: "border border-[#E8D8C7]"
								}
					`}></textarea>
				{promptError ? (
					<p className=" text-[#C86B47] text-sm">
						Describe the colors or mood you'd like the AI to create.
					</p>
				) : (
					<p className=" text-[#C86B47] text-sm invisible">
						Describe the colors or mood you'd like the AI to create.
					</p>
				)}
				<div className="mt-3 flex items-center justify-between">
					<div className="flex justify-between pl-4 w-full">
						<button
							className=" px-3 md:px-5 py-2 md:py-3  w-[40%] md:w-[60%] lg:w-[35%] rounded-2xl text-white font-medium bg-linear-to-r from-[#D96A57] to-[#7C6AE8] hover:scale-[1.02] transition cursor-pointer"
							onClick={handleGenerate}>
							✨ Generate
						</button>
							<button
	onClick={handleConnectPollinations}
	className="px-3 md:px-5 py-1 md:py-3 rounded-2xl text-white bg-linear-to-r from-[#D96A57] to-[#7C6AE8] z-10 relative cursor-pointer hover:scale-[1.02] transition "
>
	Connect Pollinations
</button>
					</div>
				
				</div>
			</div>
		);
	};

	export default PromptSection;
