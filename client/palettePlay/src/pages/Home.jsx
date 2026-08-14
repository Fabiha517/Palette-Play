import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import BackgroundDecor from "../components/BackgroundDecor";
import WorkspaceSection from "../components/WorkspaceSection";
import sideSplash from "../assets/images/sideSplash.png";
import bottomSplash from "../assets/images/bottomSplash.png";
import splash from "../assets/images/splash.png";
import { useState } from "react";


const Home = () => {
	const [image, setImage] = useState(null);
	const [prompt, setPrompt] = useState("");
  const [imageError, setImageError] = useState(false);
const [promptError, setPromptError] = useState(false);
const [titleError, setTitleError] = useState(false)
const [title, setTitle] = useState("")
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
		</main>
	);
};

export default Home;
