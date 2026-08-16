import { Outlet, Navigate } from "react-router-dom";
import useProjectStore from "./store/useProjectStore";
const ProtectedRoute = () => {
	const user = useProjectStore((state) => state.user);
	const authLoading = useProjectStore((state) => state.authLoading);

	if (authLoading) {
		return (
			<div className="min-h-screen min-w-screen  bg-[#FBEBD7] flex items-center justify-center">
				
				<Outlet />
			</div>
		);
	}
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;  
};

export default ProtectedRoute;
