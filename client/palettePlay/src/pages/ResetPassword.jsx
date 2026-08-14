import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/api";
import SplashEffect from "../components/SplashEffect";
const ResetPassword = () => {
	const { token } = useParams();
	const navigate = useNavigate();

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleResetPassword = async (e) => {
		e.preventDefault();

		setError("");

		if (password.length < 8) {
			setError("Password must be at least 8 characters.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setLoading(true);

		try {
			await resetPassword(token, password);

			setMessage("Password reset successfully.");

			setTimeout(() => {
				navigate("/login");
			}, 1500);
		} catch (error) {
			console.error(error);
			setError(
				error.message || "Failed to reset password.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-[#fbebd7] flex items-center justify-center px-6 relative z-10 overflow-hidden">

			<div className="w-full max-w-md rounded-3xl border border-[#E8D8C7] bg-[#FDF5EB] p-8 shadow-xl">

				<h1 className="text-4xl font-serif text-[#503125] text-center">
					Reset Password
				</h1>

				<p className="mt-3 text-center text-[#6D5C52]">
					Create a new password for your account.
				</p>

				<form
					onSubmit={handleResetPassword}
					className="mt-8"
				>
					<label className="block mb-2 text-[#503125] font-medium">
						New Password
					</label>

					<input
						type="password"
						value={password}
						onChange={(e) =>
							setPassword(e.target.value)
						}
						className="
							w-full
							rounded-2xl
							border
							border-[#E8D8C7]
							bg-[#FFF8F1]
							px-5
							py-3
							focus:outline-none
							focus:border-[#C86B47]
						"
					/>

					<label className="block mt-5 mb-2 text-[#503125] font-medium">
						Confirm Password
					</label>

					<input
						type="password"
						value={confirmPassword}
						onChange={(e) =>
							setConfirmPassword(e.target.value)
						}
						className="
							w-full
							rounded-2xl
							border
							border-[#E8D8C7]
							bg-[#FFF8F1]
							px-5
							py-3
							focus:outline-none
							focus:border-[#C86B47]
						"
					/>

					{error && (
						<p className="mt-4 text-sm text-[#C86B47]">
							{error}
						</p>
					)}

					{message && (
						<p className="mt-4 text-sm text-green-600">
							{message}
						</p>
					)}

					<button
						type="submit"
						disabled={loading}
						className="
							mt-7
							w-full
							rounded-2xl
							py-4
							bg-linear-to-r
							from-[#D96A57]
							to-[#7C6AE8]
							text-white
							font-medium
							cursor-pointer
							disabled:opacity-60
						"
					>
						{loading ? "Resetting..." : "Reset Password"}
					</button>
				</form>
			</div>
      <SplashEffect/>
		</main>
	);
};

export default ResetPassword;