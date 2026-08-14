
const FeatureCard = ({ icon:Icon, heading, desc }) => {
	return (
		<div className="
flex gap-4
items-center
p-4
rounded-2xl
bg-[#FFF8F1]
border border-[#cec5bb]
cursor-pointer
transition-all duration-300 ease-in-out
hover:-translate-y-2
hover:shadow-xl
">
		 <Icon className="text-2xl text-[#7F4528]" />
			<div class="flex flex-col gap-2 items-start justify-center">
				<h2 className="font-semibold">{heading}</h2>
				<p >{desc}</p>
			</div>
		</div>
	);
};

export default FeatureCard;
