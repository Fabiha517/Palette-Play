import heroImage from "../assets/images/heroImage.png";
const HeroSection = () => {
	return (
		<section className="relative z-10 max-w-7xl mx-auto ">
			<div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 items-center">
				
				<div className="space-y-10  px-8 pt-4 lg:pt-0">
					<h1 className="font-serif font-bold leading-tight text-6xl text-[#3E2A22]">
						Bring your
						<br />
						sketches to life
						<br />
						with
						<span className="text-[#C86B47]"> AI colors</span>
					</h1>

				<p className="text-[#5D534C] text-lg leading-8 max-w-md">

    Describe the colors, mood and style you imagine.

    Our AI will fill them in while keeping your original

    sketch intact.

</p>
				</div>

				<div className="flex justify-center pt-10">
					<img src={heroImage}  />
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
