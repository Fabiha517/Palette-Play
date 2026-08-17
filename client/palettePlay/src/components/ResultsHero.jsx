import { LuPencil } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProjectStore from "../store/useProjectStore";

const ResultsHero = ({
	image,
	prompt,
	selectedVersion,
	updateVersionPrompt,
}) => {
	const [editing, setEditing] = useState(false);
	const [draftPrompt, setDraftPrompt] = useState(prompt);
	const [currentPrompt, setCurrentPrompt] = useState(prompt);
	const currentProject = useProjectStore((state) => state.currentProject);

	const navigate = useNavigate();
	const handleGenerateAgain = () => {
		if (!currentProject || !selectedVersion) {
			return;
		}
		const navigationState = {
			prompt: currentPrompt,
			imageUrl: currentProject.originalImage,
			regenerate: true,
			projectId: currentProject._id,
		};

		navigate("/loading", {
			state: navigationState,
		});
	};
	const downloadImage = () => {
		const url = selectedVersion.image;
		const link = document.createElement("a");
		link.href = url;
		link.download = "palette-play.png";
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div class="flex flex-col items-center w-full ">
			<div
				className="	grid
		grid-cols-1
		lg:grid-cols-[1fr_1fr_0.9fr]
		gap-8
		items-stretch
		w-full 
		lg:h-105 rounded-3xl ">
				<div className="flex flex-col min-h-0">
					<h2 className="mb-3 font-semibold text-[#503125] text-2xl font-ser">
						Original Sketch
					</h2>

					<img
						src={image}
						className="rounded-3xl border border-[#E8D8C7] shadow-md max-w-[90%] min-h-[90%] w-auto h-auto object-cover self-center  "
					/>
				</div>

				<div className=" flex flex-col min-h-0">
					<div className="flex items-center justify-between mb-3 mt-3 md:mt-0">
						<h2 className="font-semibold text-[#503125] text-2xl font-serif">
							{" "}
							Generated Version
						</h2>
					</div>

					<img
						src={selectedVersion.image}
						className="rounded-3xl border border-[#E8D8C7] shadow-md max-w-[90%] min-h-[90%] w-auto h-auto  self-center  object-cover	"
					/>
					<button
						className="  flex lg:hidden items-center  gap-2 px-4 py-2 rounded-xl bg-[#FFF8F1] border border-[#E8D8C7] hover:bg-[#F7EFE6] transition mt-5 w-fit self-center mt-4"
						onClick={downloadImage}>
						<FiDownload />
						Download
					</button>
				</div>

				<div className="rounded-3xl bg-[#FFF8F1] border border-[#E8D8C7] p-6 shadow-md  w-full  lg:h-full min-h-0  ">
					<div class="h-full min-h-0 flex flex-col ">
						<div className="flex justify-between items-center shrink-0 ">
							<h2 className="font-semibold text-xl text-[#503125]">Prompt</h2>

							<button
								onClick={() => {
									setDraftPrompt(currentPrompt);
									setEditing(true);
								}}
								className="flex gap-2 items-center text-[#7F4528] hover:text-[#C86B47] p-1 border-[#C86B47] border-2 rounded-2xl cursor-pointer">
								<LuPencil />
								Edit
							</button>
						</div>
						{editing ? (
							<textarea
								value={draftPrompt}
								onChange={(e) => setDraftPrompt(e.target.value)}
								className="mt-5 w-full  flex-1 min-h-0  resize-none rounded-2xl border border-[#E8D8C7] p-4 bg-[#FFF8F1]  text-[#5D534C] leading-7 focus:outline-none focus:border-[#D89B72]  overflow-y-auto custom-scrollbar"></textarea>
						) : (
							<div className="mt-5 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
								<p className="whitesspace-pre-wrap leading-8 text-[#5D534C]">
									{currentPrompt}
								</p>
							</div>
						)}
						{editing ? (
							<div class="flex gap-3 mt-8 shrink-0">
								<button
									onClick={() => setEditing(false)}
									className="flex-1 rounded-2xl py-3 border  border-[#E8D8C7] cursor-pointer">
									Cancel
								</button>
								<button
									onClick={() => {
										updateVersionPrompt(selectedVersion._id, draftPrompt);
										setCurrentPrompt(draftPrompt);
										setEditing(false);
									}}
									className="flex-1 rounded-2xl py-3  text-white  bg-[#7C6AE8] cursor-pointer">
									Save
								</button>
							</div>
						) : (
							<button
								className="mt-5 w-full rounded-2xl py-4 text-white bg-linear-to-r from-[#D96A57] to-[#7C6AE8] hover:scale-[1.02] transition cursor-pointer shrink-0"
								onClick={handleGenerateAgain}>
								✨ Generate Again
							</button>
						)}
					</div>
				</div>
			</div>
			<button
				className=" hidden lg:flex items-center  gap-2 px-4 py-2 rounded-xl bg-[#1a3f10] border border-[#E8D8C7] hover:bg-[#2b7217] text-white cursor-pointer transition mt-5 "
				onClick={downloadImage}>
				<FiDownload />
				Download
			</button>
		</div>
	);
};

export default ResultsHero;
