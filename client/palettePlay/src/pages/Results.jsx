import ResultsHero from "../components/ResultsHero";
import SplashEffect from "../components/SplashEffect";
import useProjectStore from "../store/useProjectStore";


const Results = () => {

	const selectedVersion = useProjectStore((state) => state.selectedVersion);
	const setSelectedVersion = useProjectStore((state) => state.setSelectedVersion,);
	const updateVersionPrompt = useProjectStore((state) => state.updateVersionPrompt,);
	const currentProject = useProjectStore((state) => state.currentProject);

	if (!currentProject || !selectedVersion) {
		return (
			<div className="min-h-screen bg-[#fbebd7] flex items-center justify-center">
				<p className="text-[#503125]">
					Loading results...
				</p>
			</div>
		);
	}
		const image = currentProject.originalImage;
	const versions = currentProject.versions;


	return (
		<main className="relative min-h-screen overflow-hidden bg-[#fbebd7] z-20 w-full ">
			<section className="z-10 relative w-full  px-6 py-3 h-full pb-10">
				<ResultsHero
					image={image}
					generatedImage={selectedVersion.image}
					prompt={selectedVersion.prompt}
					selectedVersion={selectedVersion}
					updateVersionPrompt={updateVersionPrompt}
				/>
				<div class="mt-2">
					<h2 className="text-2xl font-semibold font-serif text-[#503125] mb-5">
						Versions
					</h2>
					<div class="flex gap-3 overflow-x-auto pb-3 custom-scrollbar">
						{versions.map((version, index) => (
							<button
								key={index}
								onClick={() => setSelectedVersion(version)}
								className={`rounded-2xl overflow-hidden border-4 transition shrink-0 ${selectedVersion === version ? "border-[#C86B47]" : "border-transparent"}`}>
								<img
									src={version.image}
									className="w-40 h-45 object-cover"
								/>
							</button>
						))}
					</div>
				</div>
			</section>
		<SplashEffect/>

		</main>
	);
};

export default Results;
