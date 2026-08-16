import UploadCard from "./UploadCard";
import PromptSection from "./PromptSection";
import leafSplash from "../assets/images/leafSplash.png";

const WorkspaceSection = ({ image, setImage, prompt, setPrompt,imageError,promptError,setImageError,setPromptError,title,setTitle,titleError,setTitleError,currentProject }) => {
	
	return (
		<section className="relative max-w-6xl mx-auto z-10 p-4 lg-p-0">
			<UploadCard image={image} setImage={setImage} imageError={imageError} />

			<PromptSection title={title} setTitle={setTitle} prompt={prompt} setPrompt={setPrompt} promptError={promptError} setImageError={setImageError} setPromptError={setPromptError} image={image} titleError={titleError} setTitleError={setTitleError} currentProject={currentProject} />
			<div class="absolute bottom-3 right-0 md:-bottom-10 lg:-bottom-18 lg:-right-10 ">
				<img src={leafSplash}  className="w-[30vw] opacity-60" />
			</div>
		</section>
	);
};

export default WorkspaceSection;
