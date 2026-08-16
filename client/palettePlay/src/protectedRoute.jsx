import { Outlet, Navigate } from "react-router-dom";
import useProjectStore from "./store/useProjectStore";
const ProtectedRoute = () => {
	const user = useProjectStore((state) => state.user);
	const authLoading = useProjectStore((state) => state.authLoading);

	if (authLoading) {
		return (
			<>
				{/* Mount the protected tree so initializeAuth can run */}
				<div className="hidden">
					<Outlet />
				</div>

				{/* What the user actually sees */}
				<div className="fixed inset-0 bg-[#FBEBD7] flex items-center justify-center z-50">
					<p className="text-[#503125]">Loading...</p>
				</div>
			</>
		);
	}
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;  
};

export default ProtectedRoute;
