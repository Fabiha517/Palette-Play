import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useProjectStore from "./store/useProjectStore";
import { getProjects } from "../services/api";

const ProtectedRoute = () => {
	const user = useProjectStore((state) => state.user);
	const authLoading = useProjectStore((state) => state.authLoading);

	const login = useProjectStore((state) => state.login);
	const setAuthLoading = useProjectStore((state) => state.setAuthLoading);
	const setProjects = useProjectStore((state) => state.setProjects);

	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const initializeAuth = async () => {
			const token = localStorage.getItem("token");

			// No token → user is not logged in
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
					setAuthLoading(false);
					return;
				}

				// Restore logged-in user
				login(data.user);

				// Restore projects
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
	}, [login, setAuthLoading, setProjects, API_URL]);

	if (authLoading) {
		return (
			<div className="min-h-screen bg-[#FBEBD7] flex items-center justify-center">
				<p className="text-[#503125]">Loading...</p>
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;