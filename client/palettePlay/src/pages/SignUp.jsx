import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "../assets/images/bgIllustartion.png"
import SplashEffect from "../components/SplashEffect";
const API_URL = import.meta.env.VITE_API_URL;
const Signup = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [errors, setErrors] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const handleSignup = async (e) => {
		e.preventDefault();
		const newErrors = {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		};
		if (!username.trim()) {
			newErrors.username = "Username is required.";
		}

		if (!email.trim()) {
			newErrors.email = "Email is required.";
		}

		if (!password) {
			newErrors.password = "Password is required.";
		} else if (password.length < 8) {
			newErrors.password = "Password must be at least 8 characters.";
		} else if (password.length > 64) {
			newErrors.password = "Password must not exceed 64 characters.";
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password.";
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match.";
		}

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}
		try {
			const response = await fetch(`${API_URL}/users/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username.trim(),
					email: email.trim(),
					password,
				}),
			});

			const data = await response.json();
			console.log(data);
			if (!response.ok) {
				setErrors({
					...newErrors,
					email: data.message,
				});
				return;
			}
			navigate("/login");
		} catch (error) {
			console.error(error);
			setErrors({
				...newErrors,
				email: "Something went wrong. Please try again.",
			});
		}
	};

	return (
		<main className="min-h-screen bg-[#FBEBD7] flex items-center justify-center  px-6 relative z-10 overflow-hidden "
		style={{
			backgroundImage:`url(${bg})`,
			  backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
		}}
		>
			<div className="w-full  max-w-lg rounded-3xl bg-[#FFF8F1] border border-[#E8D8C7] shadow-lg p-5">
				<h1 className="text-4xl font-serif text-center text-[#503125]">
					Create Account
				</h1>

				<p className="text-center text-[#8C7568] mt-3">
					Start saving your AI creations.
				</p>

				<form className="mt-8 flex flex-col gap-5" onSubmit={handleSignup}>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
							setErrors((prev) => ({
								...prev,
								username: "",
							}));
						}}
						className="rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] px-5 py-3 focus:outline-none focus:border-[#D89B72]"
					/>
					{errors.username && (
						<p className="text-sm text-red-500 -mt-3">{errors.username}</p>
					)}
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] px-5 py-3 focus:outline-none focus:border-[#D89B72]"
					/>
{errors.email && (
	<p className="text-sm text-red-500 -mt-3">
		{errors.email}
	</p>
)}
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] px-5 py-3 focus:outline-none focus:border-[#D89B72]"
					/>
					{errors.password && (
						<p className="text-sm text-red-500 -mt-3">{errors.password}</p>
					)}
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] px-5 py-3 focus:outline-none focus:border-[#D89B72]"
					/>
{errors.confirmPassword && (
	<p className="text-sm text-red-500 -mt-3">
		{errors.confirmPassword	}
	</p>
)}
					<button
						type="submit"
						className="mt-3 rounded-2xl py-3 text-white font-medium bg-linear-to-r from-[#D96A57] to-[#7C6AE8] hover:scale-[1.02] transition cursor-pointer">
						Create Account
					</button>
				</form>

				<p className="text-center mt-4 text-[#6D5C52]">
					Already have an account?
					<Link
						to="/login"
						className="text-[#7C6AE8] font-medium hover:underline">
						Log In
					</Link>
				</p>
			</div>
		
			<SplashEffect/>
		</main>
	);
};

export default Signup;
