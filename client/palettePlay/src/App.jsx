import useProjectStore from "./store/useProjectStore";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getProjects } from "../services/api";

function App() {
const API_URL = import.meta.env.VITE_API_URL;

	const login = useProjectStore((state) => state.login);
	const setAuthLoading = useProjectStore((state) => state.setAuthLoading);
	const authLoading = useProjectStore((state) => state.authLoading);
	const setProjects = useProjectStore((state) => state.setProjects);
	useEffect(() => {
		const initializeAuth = async () => {
			const token = localStorage.getItem("token");

			if (!token) {
				setAuthLoading(false);
				return;
			}

			try {
				const response = await fetch(`${API_URL}/users/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();

				if (!response.ok) {
					localStorage.removeItem("token");

					return;
				}

				login(data.user);
				const projectData = await getProjects();

				setProjects(projectData.projects);
			} catch (error) {
				console.error("Get user failed:", error);
				localStorage.removeItem("token");
			} finally {
				setAuthLoading(false);
			}
		};

		initializeAuth();
	}, [login, setAuthLoading, setProjects,API_URL]);

	if (authLoading) {
		return (
			<div className="min-h-screen bg-[#FBEBD7] flex items-center justify-center">
				<p className="text-[#503125]">Loading...</p>
			</div>
		);
	}

	return (
		<main>
			<Navbar />
			<Outlet />
		</main>
	);
}
export default App;
