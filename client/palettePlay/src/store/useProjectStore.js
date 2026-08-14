import { create } from "zustand";

const useProjectStore = create((set) => ({
	currentProject: null,
	selectedVersion: null,
	projects: [],
	user: null,
	authLoading: true,

	setCurrentProject: (project) =>
		set((state) => ({
			currentProject: project,
			selectedVersion: project.versions.at(-1),
			projects: state.projects.map((p) => (p._id === project._id ? project : p)),
		})),
	setSelectedVersion: (version) => set({ selectedVersion: version }),
	addProject: (project) =>
		set((state) => {
			const newProject = {
				...project,
				createdAt: new Date().toISOString(),
			};

			return {
				projects: [...state.projects, newProject],
				currentProject: newProject,
				selectedVersion: null,
			};
		}),
	addNewVersion: (version) =>
		set((state) => {
			if (!state.currentProject) return state;
			const newVersion = {
				...version,
				createdAt: new Date().toISOString(),
			};
			const updatedProject = {
				...state.currentProject,
				versions: [...state.currentProject.versions, newVersion],
			};

			return {
				currentProject: updatedProject,
				selectedVersion: newVersion,
				projects: state.projects.map((project) =>
					project._id === updatedProject._id ? updatedProject : project,
				),
			};
		}),
	updateVersionPrompt: (versionId, newPrompt) =>
		set((state) => {
			if (!state.currentProject) return state;

			const updatedVersions = state.currentProject.versions.map((version) =>
				version._id === versionId ? { ...version, prompt: newPrompt } : version,
			);

			const updatedSelectedVersion =
				state.selectedVersion?._id === versionId
					? { ...state.selectedVersion, prompt: newPrompt }
					: state.selectedVersion;

			const updatedProject = {
				...state.currentProject,
				versions: updatedVersions,
			};

			return {
				currentProject: updatedProject,
				selectedVersion: updatedSelectedVersion,
				projects: state.projects.map((project) =>
					project._id === updatedProject._id ? updatedProject : project,
				),
			};
		}),

	removeProject: (projectId) =>
		set((state) => ({
			projects: state.projects.filter((project) => project._id !== projectId),
			currentProject:
				state.currentProject?._id === projectId ? null : state.currentProject,
			selectedVersion:
				state.currentProject?._id === projectId ? null : state.selectedVersion,
		})),

	clearCurrentproject: () =>
		set({ currentProject: null, selectedVersion: null }),

	updateUser: (newData) =>
		set((state) => ({
			user: { ...state.user, ...newData },
		})),

	login: (userData) => set({ user: userData }),
	logout: () => set({ user: null }),
	setAuthLoading: (value) => set({ authLoading: value }),
	setCreatedProject: (project) =>
		set((state) => ({
			projects: [...state.projects, project],
			currentProject: project,
			selectedVersion: project.versions.at(-1) || null,
		})),
		setProjects: (projects) =>
    set({
        projects,
    }),
}));
export default useProjectStore;
