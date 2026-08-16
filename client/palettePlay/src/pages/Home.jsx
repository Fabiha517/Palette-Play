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
import useProjectStore from "../store/useProjectStore"
const Home = () => {
	const [image, setImage] = useState(null);
	const [prompt, setPrompt] = useState("");
	const [imageError, setImageError] = useState(false);
	const [promptError, setPromptError] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const [title, setTitle] = useState("");
	const [pollinationsStatus, setPollinationsStatus] = useState(null);
	const [showPollinationsModal, setShowPollinationsModal] = useState(false);

	useEffect(() => {
	const checkPollinations = async () => {
		try {
			
			const status = await getPollinationsStatus();

		

			const dismissed = localStorage.getItem(
				"pollinationsPromptDismissed"
			);

	

			if (!status.connected && (status.expired || !dismissed)) {
			

				setShowPollinationsModal(true);
			} else {
				console.log("NOT SHOWING MODAL");
			}
		} catch (error) {
			console.error("Pollinations status check failed:", error);
		}
	};

	checkPollinations();
}, []);
const currentProject=useProjectStore((state)=>state.currentProject)
		
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
		</main>
	);
};

export default Home;
