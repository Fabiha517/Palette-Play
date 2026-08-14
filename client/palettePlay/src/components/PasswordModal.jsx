import { useState } from "react";

const PasswordModal = ({ title = "Change Password", onCancel, onConfirm }) => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = () => {
		setError("");

		if (!currentPassword || !newPassword || !confirmPassword) {
			setError("Please fill in all fields.");
			return;
		}

		if (newPassword.length < 8) {
			setError("New password must be at least 8 characters.");
			return;
		}

		if (newPassword !== confirmPassword) {
			setError("New passwords do not match.");
			return;
		}

		onConfirm({
			currentPassword,
			newPassword,
		});
  
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
			<div className="w-full max-w-md rounded-3xl border border-[#E8D8C7] bg-[#FDF5EB] p-8 shadow-2xl">
				<h2 className="text-3xl font-serif text-[#503125] text-center">
					{title}
				</h2>

				<div className="mt-7 space-y-5">
					<div>
						<label className="block mb-2 text-[#503125] font-medium">
							Current Password
						</label>

						<input
							type="password"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							className="w-full rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] px-5 py-3 focus:outline-none focus:border-[#C86B47]"
						/>
					</div>

					<div>
						<label className="block mb-2 text-[#503125] font-medium">
							New Password
						</label>

						<input
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="w-full rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] px-5 py-3 focus:outline-none focus:border-[#C86B47]"
						/>
					</div>

					<div>
						<label className="block mb-2 text-[#503125] font-medium">
							Confirm New Password
						</label>

						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] px-5 py-3 focus:outline-none focus:border-[#C86B47]"
						/>
					</div>
				</div>

				{error && (
					<p className="mt-4 text-sm text-[#C86B47]">
						{error}
					</p>
				)}

				<div className="mt-8 flex gap-4">
					<button
						type="button"
						onClick={onCancel}
						className="flex-1 rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] py-3 font-medium text-[#503125] hover:bg-[#F7EFE6] transition cursor-pointer"
					>
						Cancel
					</button>

					<button
						type="button"
						onClick={()=>{handleSubmit;  onCancel()}}
						className="flex-1 rounded-2xl bg-linear-to-r from-[#D96A57] to-[#7C6AE8] py-3 font-medium text-white hover:scale-[1.02] transition cursor-pointer"
					>
						Change Password
					</button>
				</div>
			</div>
		</div>
	);
};

export default PasswordModal;