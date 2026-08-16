			import { useState, useEffect } from "react";
			import { IoChevronDown, IoChevronUp } from "react-icons/io5";
			import { useNavigate } from "react-router-dom";
			import useProjectStore from "../store/useProjectStore";
			import SplashEffect from "../components/SplashEffect";
			import ConfirmModal from "../components/ConfirmModal";
			import { FiDownload, FiTrash2 } from "react-icons/fi";
			import { deleteProject } from "../../services/api";
			import { useParams } from "react-router-dom";
			import { getProjectById } from "../../services/api";
			const ProjectDetails = () => {
				const [showDeleteModal, setShowDeleteModal] = useState(false);
				const { id } = useParams();
				const [loading, setLoading] = useState(true);
				const navigate = useNavigate();

				const currentProject = useProjectStore((state) => state.currentProject);

				const selectedVersion = useProjectStore((state) => state.selectedVersion);

				const setSelectedVersion = useProjectStore(
					(state) => state.setSelectedVersion,
				);
			const setCurrentProject=useProjectStore((state)=>state.setCurrentProject)
				const removeProject = useProjectStore((state) => state.removeProject);

				const [expandedPrompt, setExpandedPrompt] = useState(false);

				const [expandedHistory, setExpandedHistory] = useState({});

				useEffect(() => {
					const loadProject = async () => {
						try {
							const data = await getProjectById(id);

							setCurrentProject(data.project);
							setSelectedVersion(data.project.versions.at(-1));
						} catch (error) {
							console.error(error);
						} finally {
							setLoading(false);
						}
					};

					loadProject();
				}, [id,setCurrentProject, setSelectedVersion]);

				if (loading) {
					return <div>Loading project...</div>;
				}
				if (!currentProject) {
					return (
						<div className="min-h-screen bg-[#FBEBD7] flex items-center justify-center">
							<div className="text-center">
								<h2 className="font-serif text-3xl text-[#503125]">
									Project not found
								</h2>

								<button
									type="button"
									onClick={() => navigate("/projects")}
									className="mt-4 text-[#7F4528] underline cursor-pointer">
									Back to Projects
								</button>
							</div>
						</div>
					);
				}

				const versions = currentProject.versions || [];

				const toggleHistory = (id) => {
					setExpandedHistory((prev) => ({
						...prev,
						[id]: !prev[id],
					}));
				};

				const downloadVersion = (version) => {
					const url = version.image;
					const downloadUrl=url.replace(
						"/upload",
						"/upload/fl_attachment"
					)
					const link = document.createElement("a");

					link.href = downloadUrl;
					link.download = `version-${version._id || "image"}.png`;

					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				};

				const handleDelete = async () => {
					try {
						if (!currentProject?._id) {
							console.error("Project ID is missing");
							return;
						}

						console.log("Deleting project:", currentProject._id);
						await deleteProject(currentProject._id);

						removeProject(currentProject._id);

						setShowDeleteModal(false);

						navigate("/projects");
					} catch (error) {
						console.error("Failed to delete project:", error);
					}
				};

				return (
					<main className="relative min-h-screen	 lg:h-screen overflow-hidden bg-[#FBEBD7] px-8 py-1 z-10">
						<button
							type="button"
							onClick={() => navigate("/projects")}
							className="text-[#7F4528] mb-2 cursor-pointer">
							← Back to Projects
						</button>

						<button
							type="button"
							onClick={() => setShowDeleteModal(true)}
							className=" absolute top-3 right-3 flex items-center gap-2 rounded-full border border-red-700 bg-[#FFF8F1] px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer">
							<FiTrash2 size={17} />
							Delete Project
						</button>

						<div className="grid lg:grid-cols-[35%_65%] h-full overflow-y-auto mt-10	 md:mt-3">
							<div className="pr-6 border-r border-[#E8D8C7] flex flex-col ">
								<img
									src={currentProject.originalImage}
									alt={currentProject.title}
									className="rounded-2xl w-full h-56 p object-cover"
										
								/>

								<h2 className="font-serif text-2xl font-semibold mt-5 text-[#503125] ">
									{currentProject.title}
								</h2>

								<div className="mt-2 text-[#6D5C52] space-y-6">
									<div>
										<p className="text-sm">Created</p>

										<p className="font-medium">
											{currentProject.createdAt
												? new Date(currentProject.createdAt).toLocaleDateString()
												: "Unknown"}
										</p>
									</div>

								
									<div>
										<p className="text-sm">Total Versions</p>

										<p className="font-medium">{versions.length}</p>
									</div>

									<div>
										<p className="text-sm">Last Updated</p>

										<p className="font-medium">	{currentProject.updatedAt
												? new Date(currentProject.updatedAt).toLocaleDateString()
												: "Unknown"}</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col overflow-hidden pl-6">
								<h1 className="font-serif text-3xl text-[#503125] mb-2">
									All Versions
								</h1>

							
								<div className="flex gap-4 overflow-x-auto custom-scrollbar shrink-0 pb-2 relative">
									{versions.map((version, index) => {
										const versionId = version._id || version.id;

										const selected =
											selectedVersion?._id === versionId ||
											selectedVersion?.id === versionId;

										return (
											<div
												key={versionId}
												className={` relative rounded-2xl overflow-hidden border-4 shrink-0 cursor-pointer hover:-translate-y-1 hover:rotate-[0.8deg] transition-all shadow-xl duration-300
													${selected ? "border-[#C86B47]" : "border-transparent"}
												`}
												onClick={() => {
													setSelectedVersion(version);

													setExpandedPrompt(false);
												}}>
												{/* Download button */}
												<button
													type="button"
													onClick={(e) => {
														e.stopPropagation();
														downloadVersion(version);
													}}
													className=" absolute top-3 right-3 z-10 bg-[#FFF8F1]/90 p-2 rounded-full border border-[#E8D8C7] hover:bg-[#F7EFE6] cursor-pointer"
													aria-label={`Download version ${index + 1}`}>
													<FiDownload size={16} />
												</button>

												<img
													src={version.image}
													alt={`Version ${index + 1}`}
													className="w-40 h-40 object-cover"
												/>

												<p className="bg-[#FDF5EB] py-2 text-sm text-center">
													Version {index + 1}
												</p>
											</div>
										);
									})}
								</div>


								{/* PROMPT HISTORY */}
								<div className="flex-1 flex flex-col overflow-auto custom-scrollbar	 mt-2 mb-10 max-h-fit	 ">
									<h2 className="font-serif font-semibold text-2xl text-[#503125] mb-1">
										Prompt History
									</h2>

									<div className="flex-1 bg-[#F8F4EF] border border-[#E8D8C7] rounded-3xl  custom-scrollbar ">
										{versions.map((version, index) => {
											const versionId = version._id || version.id;

											return (
												<div
													key={versionId}
													className="border-b border-[#E8D8C7] last:border-none p-4">
													<div className="flex justify-between items-center">
														<div>
															<p className="font-medium text-[#503125]">
																Version {index + 1}
															</p>

															<p className="text-xs text-[#A89283]">
																{version.createdAt
																	? new Date(version.createdAt).toLocaleDateString()
																	: "Recently"}
															</p>
														</div>

														<button
															type="button"
															onClick={() => toggleHistory(versionId)}
															className="text-[#7F4528] cursor-pointer">
															{expandedHistory[versionId] ? (
																<IoChevronUp size={20} />
															) : (
																<IoChevronDown size={20} />
															)}
														</button>
													</div>

													<p
														className={`
															mt-3 
															leading-7
															text-[#5D534C]
															${expandedHistory[versionId] ? "" : "line-clamp-1"}
														`}>
														{version.prompt}
													</p>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>

						<SplashEffect />

						{/* DELETE MODAL ON DELETE BTN */}
						{showDeleteModal && (
							<ConfirmModal
								title="Delete Sketchbook?"
								message="This sketchbook and all of its generated versions will be permanently deleted. This action cannot be undone."
								onCancel={() => setShowDeleteModal(false)}
								onConfirm={handleDelete}
							/>
						)}
					</main>
				);
			};

			export default ProjectDetails;
