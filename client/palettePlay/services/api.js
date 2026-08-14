const API_URL = import.meta.env.VITE_API_URL;
export const createProject = async (project) => {
	const token = localStorage.getItem("token");
	const response = await fetch(`${API_URL}/projects`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(project),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Failed to create project");
	}
	return data;
};
export const uploadImage = async (image) => {
	const token = localStorage.getItem("token");
	const formData = new FormData();

	formData.append("image", image);

	const response = await fetch(`${API_URL}/images/upload`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Image upload failed");
	}

	return data;
};

export const getProjects = async () => {
	const token = localStorage.getItem("token");

	const response = await fetch(`${API_URL}/projects`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Failed to get projects");
	}

	return data;
};
export const deleteProject = async (projectId) => {
	const token = localStorage.getItem("token");

	const response = await fetch(`${API_URL}/projects/${projectId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Failed to delete project");
	}

	return data;
};
export const getProjectById = async (id) => {
	const token = localStorage.getItem("token");

	const response = await fetch(`${API_URL}/projects/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Failed to get project");
	}

	return data;
};

export const updateProfile = async (profileData) => {
	const token = localStorage.getItem("token");
	const response = await fetch(`${API_URL}/users/profile`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(profileData),
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || "Failed to update profile");
	}
	return data;
};
export const updateProfilePhoto = async (file) => {
	const token = localStorage.getItem("token");

	const formData = new FormData();

	formData.append("image", file);

	const response = await fetch(`${API_URL}/users/profile/photo`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Failed to update profile photo");
	}

	return data;
};
export const generateImages = async (prompt, referenceImageUrl) => {
	const token = localStorage.getItem("token");

	const response = await fetch(`${API_URL}/ai/generate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			prompt,
			referenceImageUrl,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Image generation failed");
	}

	return data;
};

export const addProjectVersion = async (projectId, version) => {
	const token = localStorage.getItem("token");
	const response = await fetch(
		`${API_URL}/projects/${projectId}/versions`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(version),
		},
	);
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Failed to add version");
	}

	return data;
};

export const changePassword=async(passwordData)=>{
const token=localStorage.getItem("token")
const response = await fetch(
		`${API_URL}/users/change-password`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(passwordData),
		},
	);
		const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Failed to add version");
	}

	return data;
}

export const forgotPassword=async(email)=>{
const response=await fetch(`${API_URL}/users/forgot-password`,{
	method:"POST",
	headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
})
const data=await response.json()
	if (!response.ok) {
		throw new Error(data.message || "Failed to send reset link.");
	}
	return data
	}
	
		export const resetPassword = async (token, password) => {
	const url = `${API_URL}/users/reset-password/${token}`;

	console.log("RESET URL:", url);

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			newPassword:password,
		}),
	});

	console.log("STATUS:", response.status);
	console.log("CONTENT TYPE:", response.headers.get("content-type"));

	const text = await response.text();

	console.log("RESPONSE:", text);

	let data;

	try {
		data = JSON.parse(text);
	} catch {
		throw new Error(
			`Server returned non-JSON response: ${text.slice(0, 100)}`
		);
	}

	if (!response.ok) {
		throw new Error(
			data.message || "Failed to reset password."
		);
	}

	return data;
};