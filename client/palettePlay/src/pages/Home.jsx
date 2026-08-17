import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import BackgroundDecor from "../components/BackgroundDecor";
import WorkspaceSection from "../components/WorkspaceSection";
import sideSplash from "../assets/images/sideSplash.png";
import bottomSplash from "../assets/images/bottomSplash.png";
import splash from "../assets/images/splash.png";
import { useState, useEffect } from "react";
import PollinationsConnectModal from "../components/PollinationsConnectModal";
import { getPollinationsStatus } from "../../services/api";
import useProjectStore from "../store/useProjectStore";
const Home = () => {
	const [image, setImage] = useState(null);
	const [prompt, setPrompt] = useState("");
	const [imageError, setImageError] = useState(false);
	const [promptError, setPromptError] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const [title, setTitle] = useState("");
	const [pollinationsStatus, setPollinationsStatus] = useState(null);
	const [showPollinationsModal, setShowPollinationsModal] = useState(false);
	const [showPollinationsSuccess, setShowPollinationsSuccess] = useState(false);

	useEffect(() => {
	const checkPollinations = async () => {
		try {
			const status = await getPollinationsStatus();

			setPollinationsStatus(status);

			const dismissed = localStorage.getItem(
				"pollinationsPromptDismissed"
			);

			if (!status.connected && (status.expired || !dismissed)) {
				setShowPollinationsModal(true);
			}
		} catch (error) {
			console.error("Pollinations status check failed:", error);
		}
	};

	checkPollinations();

	const params = new URLSearchParams(window.location.search);

	if (params.get("pollinations") === "connected") {
		window.history.replaceState(
			{},
			"",
			window.location.pathname
		);

		const timer = setTimeout(() => {
			setShowPollinationsSuccess(true);

			setTimeout(() => {
				setShowPollinationsSuccess(false);
			}, 4000);
		}, 0);

		return () => clearTimeout(timer);
	}
}, []);

	const currentProject = useProjectStore((state) => state.currentProject);

	return (
		<main className="relative min-h-screen overflow-hidden bg-[#fbebd7] ">
			<BackgroundDecor />
			<HeroSection />
			<WorkspaceSection
				image={image}
				setImage={setImage}
				prompt={prompt}
				setPrompt={setPrompt}
				imageError={imageError}
				promptError={promptError}
				setImageError={setImageError}
				setPromptError={setPromptError}
				title={title}
				setTitle={setTitle}
				titleError={titleError}
				setTitleError={setTitleError}
				currentProject={currentProject}
			/>

			<FeaturesSection />
			<div class="absolute -left-20 top-[10%]">
				<img src={sideSplash} className="w-[20vw]" />
			</div>
			<div class="absolute -right-20 top-[40%]">
				<img src={sideSplash} className="w-[20vw]" />
			</div>

			<div class="absolute left-20 -top-10 lg:-top-30">
				<img src={splash} className="w-[90vw] lg:w-[50vw]" />
			</div>

			<div class="absolute left-0 bottom-0 ">
				<img src={bottomSplash} className="w-[20vw]" />
			</div>
			<div class="absolute -right-40 -bottom-40 ">
				<img src={splash} className="w-[50vw]" />
			</div>
			{showPollinationsModal && (
				<PollinationsConnectModal
					expired={pollinationsStatus?.expired}
					onClose={() => {
						localStorage.setItem("pollinationsPromptDismissed", "true");
						setShowPollinationsModal(false);
					}}
				/>
			)}
			{showPollinationsSuccess && (
				<div className="fixed top-6 right-6 z-50 w-[360px] rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] p-5 shadow-xl">
					<div className="flex items-start gap-3">
						<div className="text-2xl">✓</div>

						<div>
							<h3 className="font-semibold text-[#503125]">
								Pollinations connected!
							</h3>

							<p className="mt-1 text-sm leading-6 text-[#6D5C52]">
								You're all set to generate images using your own Pollen.
							</p>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default Home;
