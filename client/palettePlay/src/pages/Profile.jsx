import { useRef, useState, useEffect } from "react";
import useProjectStore from "../store/useProjectStore";
import SplashEffect from "../components/SplashEffect";
import { updateProfile, updateProfilePhoto } from "../../services/api";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../components/PasswordModal";
const Profile = () => {
	const user = useProjectStore((state) => state.user);
	const updateUser = useProjectStore((state) => state.updateUser);
	const projects = useProjectStore((state) => state.projects);
	const logout = useProjectStore((state) => state.logout);
	const [isEditingUsername, setIsEditingUsername] = useState(false);
	const [isEditingBio, setIsEditingBio] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState("");
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [profilePhoto, setProfilePhoto] = useState(null);
	const usernameRef = useRef(null);
	const bioRef = useRef(null);
	const fileInputRef = useRef(null);
	const navigate = useNavigate();
	const totalVersions = projects.reduce(
		(sum, project) => sum + project.versions.length,
		0,
	);

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];

		if (!file) return;

		setProfilePhoto(file);
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		logout();
		navigate("/login");
	};
	const handleNameChange = () => {
		if (isEditingUsername) {
			setIsEditingUsername(false);
		} else {
			setIsEditingUsername(true);
		}
	};

	const handleBioChange = () => {
		if (isEditingBio) {
			setIsEditingBio(false);
		} else {
			setIsEditingBio(true);
		}
	};

	useEffect(() => {
		if (isEditingUsername) {
			usernameRef.current?.focus();
		}
	}, [isEditingUsername]);

	useEffect(() => {
		if (isEditingBio) {
			bioRef.current?.focus();
		}
	}, [isEditingBio]);

	const handleSaveChanges = async () => {
		if (!user) return;

		setSaveError("");
		setIsSaving(true);

		try {
			const username = usernameRef.current?.value.trim();
			const bio = bioRef.current?.value.trim();
			let updatedUser = user;
			const profileResponse = await updateProfile({
				username,
				bio,
			});
			updatedUser = profileResponse.user;
			if (profilePhoto) {
				const photoResponse = await updateProfilePhoto(profilePhoto);

				updatedUser = photoResponse.user;
			}
			updateUser(updatedUser);
			setProfilePhoto(null);
			setIsEditingUsername(false);
			setIsEditingBio(false);
		} catch (error) {
			console.error(error);
			setSaveError(error.message || "Failed to save profile.");
		} finally {
			setIsSaving(false);
		}
	};

	if (!user) {
		return <div>Loading profile...</div>;
	}

	return (
		<main className="relative min-h-screen overflow-hidden bg-[#fbebd7] px-6 py-6 z-10">
			<div className="max-w-7xl mx-auto grid lg:grid-cols-[320px_1fr] gap-10">
				{/* LEFT PANEL */}

				<div className="border-r border-[#E8D8C7] lg:pr-8">
					<div className="flex flex-col items-center  justify-center">
						<div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#E8D8C7] bg-[#FFF8F1] shadow self-center">
							{(profilePhoto || user.profileImage) && (
								<img
									src={
										profilePhoto
											? URL.createObjectURL(profilePhoto)
											: user.profileImage
									}
									className="w-full h-full object-cover"
									alt="Profile"
								/>
							)}
						</div>

						<h2 className="mt-5 text-3xl font-serif text-[#503125] text-center ">
							{user.username || "Unnamed Artist"}
						</h2>

						<p className="mt-2 text-[#7D695B] italic text-center">
							Creating stories through colors ✨
						</p>
					</div>

					<div className="mt-5 gap-10 flex lg:flex-col lg:gap-0 items-center justify-between lg:items-start lg:pl-5 space-y-6 text-[#5E4B42] ">
						<div>
							<p className="uppercase tracking-wider text-xs text-[#9C8475]">
								Member Since
							</p>

							<p className="mt-1 ">
								{user.createdAt
									? new Date(user.createdAt).toLocaleDateString("en-US", {
											month: "long",
											year: "numeric",
										})
									: "Unknown"}
							</p>
						</div>

						<div>
							<p className="uppercase tracking-wider text-xs text-[#9C8475]">
								Sketchbooks
							</p>

							<p className="mt-1 font-medium">{projects.length}</p>
						</div>

						<div>
							<p className="uppercase tracking-wider text-xs text-[#9C8475]">
								Total Versions
							</p>

							<p className="mt-1 font-medium">{totalVersions}</p>
						</div>
					</div>
				</div>

				{/* RIGHT PANEL */}

				<div>
					<h1 className="text-4xl font-serif text-[#503125] mb-8">
						Profile Settings
					</h1>

					<div className="bg-[#FDF5EB] border border-[#E8D8C7] rounded-3xl p-8 shadow-sm">
						<div className="grid md:grid-cols-2 gap-8">
							{/* USERNAME */}

							<div>
								<label className="block text-[#503125] font-medium mb-2">
									User Name
								</label>

								<input
									type="text"
									ref={usernameRef}
									defaultValue={user.username}
									disabled={!isEditingUsername}
									className={`w-full rounded-2xl border px-5 py-3 bg-[#FFF8F1] focus:outline-none focus:border-[#C86B47] ${
										isEditingUsername ? "border-[#C86B47]" : "border-[#E8D8C7]"
									}`}
								/>

								<button
									className="bg-pink-200 p-1 pl-2 pr-2 mt-2 rounded-xl cursor-pointer border border-pink-400 hover:bg-pink-300 transition-colors"
									onClick={handleNameChange}>
									{isEditingUsername ? "Done" : "Edit Username"}
								</button>
							</div>

							{/* EMAIL */}

							<div>
								<div className="block text-[#503125] font-medium mb-2">
									Email
								</div>

								<div className="w-full rounded-2xl border border-[#E8D8C7] bg-[#FFF8F1] px-5 py-3">
									{user.email}
								</div>
							</div>
						</div>

						{/* BIO */}

						<div className="mt-8">
							<label className="block text-[#503125] font-medium mb-2">
								Bio
							</label>

							<textarea
								ref={bioRef}
								rows={6}
								defaultValue={user.bio || ""}
								disabled={!isEditingBio}
								className={`w-full resize-none rounded-2xl border bg-[#FFF8F1] px-5 py-4 leading-5 focus:outline-none focus:border-[#C86B47] ${
									isEditingBio ? "border-[#C86B47]" : "border-[#E8D8C7]"
								}`}
							/>

							<button
								onClick={handleBioChange}
								className="bg-pink-200 p-1 pl-2 pr-2 mt-2 rounded-xl cursor-pointer border border-pink-400 hover:bg-pink-300 transition-colors">
								{isEditingBio ? "Done" : "Edit Bio"}
							</button>
						</div>

						<div className="mt-8 flex items-center gap-4">
							<button
								onClick={() => fileInputRef.current?.click()}
								className="px-6 py-3 rounded-2xl border border-[#b97cdf] bg-[#e1c9db] hover:bg-[#f5b0e9] transition cursor-pointer">
								Change Profile Photo
							</button>

							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handlePhotoChange}
								className="hidden"
							/>
						</div>

						{saveError && (
							<p className="mt-4 text-sm text-[#C86B47]">{saveError}</p>
						)}

						<div className="mt-10 flex justify-between items-center">
							<button
								onClick={handleSaveChanges}
								disabled={isSaving}
								className="px-10 py-4 rounded-2xl bg-linear-to-r from-[#D96A57] to-[#7C6AE8] text-white font-medium hover:scale-[1.02] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
								{isSaving ? "Saving..." : "Save Changes"}
							</button>
							<button
								onClick={() => setShowPasswordModal(true)}
								className="px-8 py-3 rounded-2xl bg-linear-to-r from-[#e27497] to-[#d36551] text-white font-medium hover:scale-[1.02] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
								Change Password
							</button>
							<button
								onClick={handleLogout}
								className="px-8 py-3 rounded-2xl bg-linear-to-r from-[#d76652] to-[#e8a36a] text-white font-medium hover:scale-[1.02] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>
			{showPasswordModal && (
				<PasswordModal
					title="Change Password"
					onCancel={() => setShowPasswordModal(false)}
				/>
			)}
			<SplashEffect />
		</main>
	);
};

export default Profile;
