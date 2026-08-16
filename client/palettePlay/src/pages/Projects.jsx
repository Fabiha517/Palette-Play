import { useNavigate } from "react-router-dom";
import useProjectStore from "../store/useProjectStore";
import SplashEffect from "../components/SplashEffect";
import paperclip from "../assets/svgs/paperclip.svg";
import { FiTrash2 } from "react-icons/fi";
import ConfirmModal from "../components/ConfirmModal";
import { useState } from "react";
import { deleteProject } from "../../services/api";

const Projects = () => {
	const projects = useProjectStore((state) => state.projects);
	const setCurrentProject = useProjectStore((state) => state.setCurrentProject);
	const removeProject = useProjectStore((state) => state.removeProject);

	const [projectToDelete, setProjectToDelete] = useState(null);

	const navigate = useNavigate();

	const handleDeleteProject = async (projectId) => {
		try {
			console.log("Deleting project:", projectId);

			await deleteProject(projectId);

			// Only remove from Zustand after MongoDB deletion succeeds
			removeProject(projectId);

			setProjectToDelete(null);
		} catch (error) {
			console.error("Delete project failed:", error);
		}
	};

	const openProject = (project) => {
		setCurrentProject(project);
		navigate(`/project-details/${project._id}`);
	};

	return (
		<main className="min-h-screen bg-[#FBEBD7] px-8 py-8 relative z-10 overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center gap-3 mb-8">
					<h1 className="text-4xl font-serif text-[#503125] font-semibold">
						My Sketchbooks
					</h1>

					<span className="bg-[#e8c7e8] text-[#503125] rounded-xl px-4 py-1 text-sm font-medium">
						{projects.length}
					</span>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
					{projects.map((project,index) => (
						<div
							key={project._id}
							style={{animationDelay: `${index * 100}ms`,}}
							onClick={() => openProject(project)}
							className="
									animate-sketchbook-in
									bg-[#f8eddf]
									rounded-3xl
									p-2 pb-3
									border
									border-[#E8D8C7]
									shadow-sm
									hover:shadow-xl
									hover:-translate-y-1
									hover:rotate-[0.8deg]
									transition-all
									duration-300
									ease-out
									duration-300
									cursor-pointer
									text-left
									relative
								">
							{/* Delete button */}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									setProjectToDelete(project);
								}}
								className="
										absolute
										top-3
										right-3
										z-10
										p-2
										rounded-full
										bg-[#FFF8F1]/80
										hover:bg-red-100
										text-red-600
										cursor-pointer
									">
								<FiTrash2 size={18} />
							</button>

							{/* Paperclip */}
							<img
								src={paperclip}
								className="
										absolute
										top-[-8px]
										right-3
										w-6
										rotate-6
										pointer-events-none
									"
								alt=""
							/>

							{/* Project image */}
							<div className="overflow-hidden rounded-2xl">
								<img
									src={project.versions?.at(-1)?.image || project.originalImage}
									alt={project.title}
									className="w-full h-52 object-cover"
								/>
							</div>

							{/* Project information */}
							<div className="mt-2 px-1">
								<h2 className="font-semibold text-lg text-[#503125] truncate">
									{project.title}
								</h2>

								<p className="text-[#8A6B5A] text-sm mt-1">
									{project.versions.length} version
									{project.versions.length !== 1 && "s"}
								</p>

								<p className="text-[#A48C7A] text-xs mt-2">
										Last edited: 
										{project.updatedAt
												? new Date(project.updatedAt).toLocaleDateString()
												: "Unknown"}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Empty state */}
				{projects.length === 0 && (
					<div className="flex items-center justify-center h-[60vh]">
						<div className="text-center">
							<h2 className="font-serif text-3xl text-[#503125]">
								No Sketchbooks Yet
							</h2>

							<p className="text-[#7D695B] mt-3">
								Create your first artwork to see it here.
							</p>
						</div>
					</div>
				)}
			</div>

			<SplashEffect />

			
			{projectToDelete && (
				<ConfirmModal
					title="Delete Sketchbook?"
					message="This sketchbook and all of its generated versions will be permanently deleted. This action cannot be undone."
					onCancel={() => setProjectToDelete(null)}
					onConfirm={() => handleDeleteProject(projectToDelete._id)}
				/>
			)}
		</main>
	);
};

export default Projects;
