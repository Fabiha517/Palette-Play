import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useProjectStore from "../store/useProjectStore";
import SplashEffect from "../components/SplashEffect";
import { forgotPassword } from "../../services/api";
const API_URL = import.meta.env.VITE_API_URL;
const Login = () => {
	const navigate = useNavigate();

	const login = useProjectStore((state) => state.login);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [forgotEmail, setForgotEmail] = useState("");
	const [resetSent, setResetSent] = useState(false);
	const [forgotLoading, setForgotLoading] = useState(false);
	const [forgotError, setForgotError] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);


	const handleForgotPassword=async()=>{
		if(!forgotEmail.trim()){
setForgotError("Please enter your email.")
		}
		setForgotError("")
		setForgotLoading(true)
		try {
			await forgotPassword(forgotEmail.trim())
			setResetSent(true)
		} catch (error) {
			console.error(error);
		setForgotError(error.message || "Failed to send reset link.");
		}finally{
		setForgotLoading(false)
	}
	}
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		setError("");
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!formData.email.trim() && !formData.password.trim()) {
			setError("Enter your email and password");
			return;
		}

		if (!formData.email.trim()) {
			setError("Enter your email");
			return;
		}

		if (!formData.password.trim()) {
			setError("Enter your password");
			return;
		}

		try {
			setLoading(true);
			setError("");

			const response = await fetch(`${API_URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formData.email.trim(),
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Login failed.");
			}

			localStorage.setItem("token", data.token);

			login(data.user);

			navigate("/");
		} catch (error) {
			console.error("Login error:", error);

			setError(error.message || "Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-[#FBEBD7] px-5 py-10 relative z-10 overflow-hidden">
			<div className="w-full max-w-md bg-[#FDF5EB] border border-[#E8D8C7] rounded-3xl p-8 shadow-sm">
				<h1 className="text-4xl font-serif font-semibold text-center text-[#503125]">
					Welcome Back
				</h1>

				<p className="text-center text-[#8C7568] mt-3">
					Continue creating your colorful stories.
				</p>

				<form onSubmit={handleLogin} className="mt-8 flex flex-col gap-5">
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Email"
						className="
								w-full
								rounded-2xl
								border
								border-[#E8D8C7]
								bg-[#FFF8F1]
								px-5
								py-4
								text-[#503125]
								placeholder:text-[#A89283]
								focus:outline-none
								focus:border-[#D89B72]
							"
					/>

					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Password"
						className="
								w-full
								rounded-2xl
								border
								border-[#E8D8C7]
								bg-[#FFF8F1]
								px-5
								py-4
								text-[#503125]
								placeholder:text-[#A89283]
								focus:outline-none
								focus:border-[#D89B72]
							"
					/>

					{error && <p className="text-center text-sm text-red-600">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="
								mt-2
								w-full
								rounded-2xl
								py-4
								text-white
								font-medium
								bg-gradient-to-r
								from-[#D96A57]
								to-[#7C6AE8]
								hover:scale-[1.02]
								transition
								cursor-pointer
								disabled:opacity-60
								disabled:cursor-not-allowed
							">
						{loading ? "Logging in..." : "Log In"}
					</button>
				</form>

<div class=" mt-6 flex gap-3 items-center justify-center">
				<p className="text-center  text-[#6D5C52]">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-[#7C6AE8] font-semibold hover:underline">
						Sign Up
					</Link>
				</p>
				<button
	type="button"
	onClick={() => {
		setShowForgotPassword(true);
		setResetSent(false);
		setForgotError("");
	}}
	className="text-sm  font-semibold text-[#7C6AE8] hover:underline cursor-pointer"
>
	Forgot password?
</button>
</div>
			</div>

			{showForgotPassword && (
	<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
		<div className="w-full max-w-md rounded-3xl border border-[#E8D8C7] bg-[#FDF5EB] p-8 shadow-2xl">

			<h2 className="text-3xl font-serif text-[#503125] text-center">
				Forgot your password?
			</h2>

			{!resetSent ? (
				<>
					<p className="mt-4 text-center text-[#6D5C52] leading-7">
						Enter your email and we'll send you a reset link.
					</p>

					<input
						type="email"
						value={forgotEmail}
						onChange={(e) => setForgotEmail(e.target.value)}
						placeholder="Enter your email"
						className="
							mt-6
							w-full
							rounded-2xl
							border
							border-[#E8D8C7]
							bg-[#FFF8F1]
							px-5
							py-3
							text-[#503125]
							focus:outline-none
							focus:border-[#C86B47]
						"
					/>

					{forgotError && (
						<p className="mt-3 text-sm text-[#C86B47]">
							{forgotError}
						</p>
					)}

					<div className="mt-7 flex gap-4">
						<button
							type="button"
							onClick={() => setShowForgotPassword(false)}
							className="
								flex-1
								rounded-2xl
								border
								border-[#E8D8C7]
								bg-[#FFF8F1]
								py-3
								text-[#503125]
								hover:bg-[#F7EFE6]
								transition
								cursor-pointer
							"
						>
							Cancel
						</button>

						<button
							type="button"
							disabled={forgotLoading}
							onClick={handleForgotPassword}
							className="
								flex-1
								rounded-2xl
								bg-linear-to-r
								from-[#D96A57]
								to-[#7C6AE8]
								py-3
								text-white
								font-medium
								transition
								cursor-pointer
								disabled:opacity-60
							"
						>
							{forgotLoading ? "Sending..." : "Send Link"}
						</button>
					</div>
				</>
			) : (
				<>
					<p className="mt-5 text-center leading-7 text-[#6D5C52]">
						Reset link sent to
					</p>

					<p className="mt-1 text-center font-medium text-[#503125] break-all">
						{forgotEmail}
					</p>

					<p className="mt-6 text-center text-[#6D5C52]">
						Didn't receive the email/link?
					</p>

					<button
						type="button"
						disabled={forgotLoading}
						onClick={handleForgotPassword}
						className="
							mt-2
							block
							mx-auto
							text-[#7C6AE8]
							font-medium
							hover:underline
							cursor-pointer
							disabled:opacity-50
						"
					>
						{forgotLoading ? "Sending..." : "Resend"}
					</button>

					<button
						type="button"
						onClick={() => setShowForgotPassword(false)}
						className="
							mt-7
							w-full
							rounded-2xl
							border
							border-[#E8D8C7]
							bg-[#FFF8F1]
							py-3
							text-[#503125]
							hover:bg-[#F7EFE6]
							transition
							cursor-pointer
						"
					>
						Close
					</button>
				</>
			)}
		</div>
	</div>
)}
			<SplashEffect />
		</main>
	);
};

export default Login;
