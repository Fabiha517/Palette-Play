import App from "./App";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import { Loading } from "./pages/Loading";
import Results from "./pages/Results";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./protectedRoute";
import ResetPassword from "./pages/ResetPassword";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	},

	{
		path: "login",
		element: <Login />,
	},

	{
		path: "signup",
		element: <SignUp />,
	},

	{
		path: "reset-password/:token",
		element: <ResetPassword />,
	},

	{
		path: "/",
		element: <ProtectedRoute />,
		children: [
			{
				element: <App />,
				children: [
					{
						path: "home",
						element: <Home />,
					},
					{
						path: "projects",
						element: <Projects />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "loading",
						element: <Loading />,
					},
					{
						path: "results",
						element: <Results />,
					},
					{
						path: "project-details/:id",
						element: <ProjectDetails />,
					},
				],
			},
		],
	},
]);