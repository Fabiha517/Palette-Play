import useProjectStore from "./store/useProjectStore";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getProjects } from "../services/api";

// const setAuthLoading=useProjectStore((state)=>state.setAuthLoading )
// const authLoading=useProjectStore((state)=>state.authLoading )
//   useEffect(() => {
//     const getMe = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {setAuthLoading(false); return}
//       try {
//         const response = await fetch("http://localhost:5000/users/me", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         if (!response.ok) {
//           localStorage.removeItem("token");
//           return;
//         }
//         login(data.user);
//       } catch (error) {
//         console.error("Get user failed", error);
//       }finally {
//             setAuthLoading(false);
//         }
//     };
//     getMe();
//   }, );
// if (authLoading) {
//         return <div>Loading...</div>;
//     }
//   return (
//     <main>
//       <Navbar />
//       <Outlet />
//     </main>
//   );
// }

// export default App;
function App() {
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
				const response = await fetch("http://localhost:5000/users/me", {
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
	}, [login, setAuthLoading, setProjects]);

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
