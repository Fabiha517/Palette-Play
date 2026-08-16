import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { connectPollinations } from "../../services/api";

const PollinationsConnectModal = ({ onClose, expired = false }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleConnect = async () => {
		try {
			setLoading(true);
			setError("");

			const data = await connectPollinations();

			window.location.href = data.authorizationUrl;
		} catch (error) {
			console.error(error);
			setError(error.message || "Failed to connect Pollinations");
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
			<div className="relative w-full max-w-md rounded-3xl bg-[#FFF8F1] border border-[#E8D8C7] p-7 shadow-xl">
				
				<button
					onClick={onClose}
					className="absolute right-5 top-5 text-[#503125] hover:text-[#C86B47] cursor-pointer"
				>
					<IoClose size={24} />
				</button>

				<div className="pr-8">
					<h2 className="text-2xl font-semibold text-[#503125]">
						{expired
							? "Your Pollinations connection expired"
							: "Connect Pollinations"}
					</h2>

					<p className="mt-4 leading-7 text-[#5D534C]">
						{expired
							? "Your Pollinations authorization has expired. Reconnect your account to continue generating images with your own Pollen."
							: "Connect your Pollinations.ai account to use your own Pollen for AI image generation."}
					</p>
				</div>

				{error && (
					<p className="mt-4 rounded-xl bg-[#FCE5DD] p-3 text-sm text-[#C86B47]">
						{error}
					</p>
				)}

				<button
					onClick={handleConnect}
					disabled={loading}
					className="mt-6 w-full rounded-2xl py-3 text-white font-medium bg-linear-to-r from-[#D96A57] to-[#7C6AE8] hover:scale-[1.02] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{loading ? "Connecting..." : "Connect Pollinations"}
				</button>

				<p className="mt-3 text-center text-sm text-[#8A766B]">
					You can continue browsing without connecting.
				</p>
			</div>
		</div>
	);
};

export default PollinationsConnectModal;