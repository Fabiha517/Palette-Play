const UploadCard = ({ image, setImage, imageError }) => {
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setImage(file);
	};
	return (
		<label className="block cursor-pointer pb-5">
			<div
				className={`w-full max-w-md rounded-3xl p-6 transition-all duration-300
    ${imageError ? "border-2 border-[#C86B47]" : "border border-[#E8D8C7]"}
    bg-[#FFF8F1]`}>

				{imageError ? (
					<p className=" text-[#C86B47] text-sm">
						Please upload a sketch to begin.
					</p>
				): 	<p className=" text-[#C86B47] text-sm invisible">
						Please upload a sketch to begin.
					</p>}
				<div className="flex items-center gap-5">
					<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8E5D6] text-3xl">
						🎨
					</div>

					<div>
						<h3 className="font-semibold text-xl text-[#503125]">
							Upload your sketch
						</h3>

						<div className="text-[#7C685C]">
							{image ? (
								image.name
							) : (
								<>
									
									<div>
										Drag & drop or click to browse <br />{" "}
										<p className="text-sm text-[#B39B8A]">
											PNG, JPG up to 10MB
										</p>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<input
				type="file"
				accept="image/png,image/jpeg,image/jpg"
				className="hidden"
				onChange={handleFileChange}
			/>
		</label>
	);
};

export default UploadCard;
