const ConfirmModal = ({
	title,
	message,
	onCancel,
	onConfirm,
}) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
			<div className="w-[90%] max-w-md rounded-3xl border border-[#E8D8C7] bg-[#FDF5EB] p-8 shadow-2xl">
				<h2 className="text-3xl font-serif text-[#503125] text-center">
					{title}
				</h2>

				<p className="mt-5 text-center leading-7 text-[#6D5C52]">
					{message}
				</p>

				<div className="mt-8 flex gap-4">
					<button
						onClick={onCancel}
						className="
							flex-1
							rounded-2xl
							border
							border-[#E8D8C7]
							bg-[#FFF8F1]
							py-3
							font-medium
							text-[#503125]
							hover:bg-[#F7EFE6]
							transition
							cursor-pointer">
						Cancel
					</button>

					<button
						onClick={onConfirm}
						className="
							flex-1
							rounded-2xl
							bg-[#D96A57]
							py-3
							font-medium
							text-white
							hover:bg-[#c85846]
							transition
							cursor-pointer">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;