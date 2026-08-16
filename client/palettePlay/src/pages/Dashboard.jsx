import { Link } from "react-router-dom";
import {
	FiArrowRight,
	FiUpload,
	FiEdit3,
	FiHeart,
	FiFolder,
	FiZap,
} from "react-icons/fi";
import logo from "../assets/svgs/logo.svg";
import SplashEffect from "../components/SplashEffect";
import brush from "../assets/images/brush.png"
import brush2 from "../assets/images/brush_2.png"
import coloredImage3 from "../assets/images/coloredImage3.jpg"
import image3 from "../assets/images/dashHero3.jpeg";
const Dashboard = () => {
	return (
		<main className=" bg-[#fbebd7] text-[#503125] overflow-hidden relative z-10 w-full">
			<header className="relative z-20 w-full">
				<div className="w-full mx-auto px-6 lg:px-10 py-4 flex items-center justify-between border  border-[#BE8C73]/25">
					<Link to="/" className="flex items-center">
						<img src={logo} alt="PalettePlay" className="w-44" />
					</Link>

					<div className="flex items-center gap-4">
						<Link
							to="/login"
							className="
								px-5 py-2.5
								rounded-xl
								text-[#503125]
								font-medium
								hover:bg-[#fff7ed]
								transition
							">
							Log in
						</Link>

						<Link
							to="/signup"
							className="
								px-2 md:px-4 py-2
								rounded-xl
								text-white
								font-semibold
								bg-linear-to-r
								from-[#D96A57]
								to-[#7C6AE8]
								shadow-md
								hover:scale-[1.03]
								transition
							">
							Sign Up
						</Link>
					</div>
				</div>
			</header>

			<section className="relative w-full">
				<div
					className="
						w-full
						mx-auto
						px-6
						lg:px-10
						pt-12
						pb-20
						grid
						lg:grid-cols-2
						gap-14
						items-center
					">
					<div>
						<div
							className="
								inline-flex
								items-center
								gap-2
								px-4
								py-2
								rounded-full
								bg-white/60
								border
								border-[#E8D8C7]
								text-sm
								font-medium
								mb-7
							">
							<FiZap className="text-[#7C6AE8]" />
							AI-powered coloring for your imagination
						</div>

						<h1
							className="
								text-5xl
								md:text-6xl
								lg:text-7xl
								font-serif
								font-semibold
								leading-[1.05]
								text-[#3E2A22]
							">
							Turn your sketches
							<br />
							into{" "}
							<span
								className="
									bg-linear-to-r
									from-[#D96A57]
									via-[#B96FAE]
									to-[#7C6AE8]
									bg-clip-text
									text-transparent
								">
								colorful stories.
							</span>
						</h1>

						<p className="mt-7 max-w-xl text-lg md:text-xl leading-8 text-[#6D5C52]">
							Upload your line art and let AI bring it to life with beautiful
							colors while preserving the details that make your artwork yours.
						</p>

						<div className="mt-9 flex flex-wrap items-center gap-5">
							<Link
								to="/signup"
								className="
									flex
									items-center
									gap-3
									px-7
									py-4
									rounded-2xl
									text-white
									font-semibold
									bg-linear-to-r
									from-[#D96A57]
									to-[#7C6AE8]
									shadow-lg
									hover:scale-[1.03]
									transition
								">
								<FiZap />
								Get Started
								<FiArrowRight />
							</Link>

							<a
								href="#how-it-works"
								className="
									flex
									items-center
									gap-2
									font-medium
									text-[#503125]
									hover:text-[#7C6AE8]
									transition
								">
								See how it works
								<FiArrowRight />
							</a>
						</div>
					</div>

					<div className="relative ">
						<div
							className="
								relative
								rounded-[2.5rem]
								bg-white/50
								border
								border-[#E8D8C7]
								shadow-[0_25px_70px_rgba(80,49,37,0.12)]
							">
							<div className="grid grid-cols-2 h-[30vh] md:h-[50vh] lg:h-[65vh]  overflow-hidden rounded-[2rem]">
								<div
									className="
										aspect-square
									bg-red
										flex
										w-full h-full
										items-center
										justify-center
										relative
									">
                    <img src={image3} className="p-0 w-full h-full object-cover"/>
									
								</div>

								
								<div
									className="
										aspect-square
										bg-linear-to-br
										from-[#F9DCCF]
										via-[#E8D8F7]
										to-[#CFE8E0]
										flex
										items-center
										justify-center
										w-full h-full
										relative
									">
									<img src={coloredImage3}className="w-full h-full object-cover"/>
								</div>
							</div>

						{/*Arrow*/}
							<div
								className="
									absolute
									top-1/2
									left-1/2
									-translate-x-1/2
									-translate-y-1/2
									w-12
									h-12
									rounded-full
									bg-white
									shadow-lg
									flex
									items-center
									justify-center
									text-[#7C6AE8]
									font-bold
								">
								<FiArrowRight size={20} />
							</div>
						</div>

						{/* decorative blobs */}
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D9C8F4]/50 rounded-full blur-3xl -z-10" />
						<div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#F3BFAE]/40 rounded-full blur-3xl -z-10" />
					</div>
				</div>
			</section>

			
			<section className="w-full mx-auto px-6 lg:px-10 pb-12">
				<div
					className="
						grid
						sm:grid-cols-2
						lg:grid-cols-4
						rounded-3xl
						bg-white/45
						border
						border-[#E8D8C7]
						overflow-hidden
					">
					<Feature
						icon={<FiZap />}
						title="AI-Powered Coloring"
						description="Beautiful colors while preserving your original line art."
					/>

					<Feature
						icon={<FiHeart />}
						title="Made for Artists"
						description="Your artwork stays at the heart of every generation."
					/>

					<Feature
						icon={<FiZap />}
						title="Quick & Easy"
						description="Turn a simple sketch into a colorful version in moments."
					/>

					<Feature
						icon={<FiFolder />}
						title="Save & Organize"
						description="Keep your creations together inside your projects."
					/>
				</div>
			</section>

			
			<section
				id="how-it-works"
				className="w-full mx-auto px-6 lg:px-10 pb-24">
				<div className="text-center mb-8">
					<p className="text-[#7C6AE8] font-medium mb-3">Simple by design</p>

					<h2 className="text-4xl md:text-5xl font-serif text-[#3E2A22]">
						How it works
					</h2>
				</div>

				<div className="grid md:grid-cols-4 gap-6 h-full cursor-pointer">
					<Step
						number="01"
						icon={<FiUpload />}
						title="Upload"
						description="Upload your line art or sketch."
					/>

					<Step
						number="02"
						icon={<FiEdit3 />}
						title="Describe"
						description="Tell us how you want your artwork colored."
					/>

					<Step
						number="03"
						icon={<FiZap />}
						title="AI Colors"
						description="Our AI creates beautiful colored versions."
					/>

					<Step
						number="04"
						icon={<FiHeart />}
						title="Create"
						description="Save your favorite version and enjoy your masterpiece."
					/>
				</div>
			</section>

			<section className="px-6 pb-20">
				<div
					className="
						max-w-5xl
						mx-auto
						rounded-[2.5rem]
						p-10
						md:p-16
						text-center
						bg-linear-to-br
						from-[#F8D8CC]
						via-[#EBDCF7]
						to-[#DDEDE5]
						border
						border-white/60
					">
					<h2 className="text-4xl md:text-5xl font-serif text-[#3E2A22]">
						Ready to bring your art to life?
					</h2>

					<p className="max-w-xl mx-auto mt-5 text-[#6D5C52] text-lg">
						Create your free account and start transforming your sketches into
						colorful artwork.
					</p>

					<Link
						to="/signup"
						className="
							inline-flex
							items-center
							gap-3
							mt-8
							px-8
							py-4
							rounded-2xl
							bg-[#503125]
							text-white
							font-semibold
							hover:scale-[1.03]
							transition
						">
						Start Creating
						<FiArrowRight />
					</Link>
				</div>
			</section>

			<footer className="border-t border-[#E8D8C7]">
				<div
					className="
					 w-full
						mx-auto
						px-6
						lg:px-10
						py-4
						flex
						flex-col
						md:flex-row
						items-center
						justify-between
						gap-4
						text-sm
						text-[#806D61]
					">
					<p>© {new Date().getFullYear()} PalettePlay</p>

					<p className="font-serif text-lg text-[#503125]">
						Make something beautiful.
					</p>

					<div className="flex gap-5">
						<Link to="/login" className="hover:text-[#7C6AE8]">
							Log in
						</Link>

						<Link to="/signup" className="hover:text-[#7C6AE8]">
							Sign up
						</Link>
					</div>
				</div>
			</footer>
			<SplashEffect/>
			<div class="absolute bottom-100 -left-10 -z-10">

				<img src={brush} className=" w-[80vw] md:w-[40vw] opacity-90 -z-20"/>
			</div>
			<div class="absolute top-150 -right-10 -z-10">

				<img src={brush2} className=" w-[80vw] md:w-[50vw] opacity-90 -z-20"/>
			</div>
		</main>
	);
};

/*  FEATURE  Component */

const Feature = ({ icon, title, description }) => {
	return (
		<div
			className="
				p-7
				border-b
				sm:border-b-0
				lg:border-r
				last:border-0
				border-[#E8D8C7]
			">
			<div
				className="
					w-12
					h-12
					rounded-full
					bg-[#E9DDF7]
					flex
					items-center
					justify-center
					text-[#7C6AE8]
					text-xl
					mb-5
				">
				{icon}
			</div>

			<h3 className="font-semibold text-lg text-[#503125]">{title}</h3>

			<p className="mt-2 text-sm leading-6 text-[#806D61]">{description}</p>
		</div>
	);
};



const Step = ({ number, icon, title, description }) => {
	return (
		<div
			className="
				relative
				p-7
				rounded-3xl
				bg-white/45
				border
				border-[#E8D8C7]
				hover:-translate-y-1
				transition
			">
			<span className="text-sm font-semibold text-[#B69CF7]">{number}</span>

			<div
				className="
					mt-5
					w-12
					h-12
					rounded-2xl
					bg-[#F8E2D9]
					flex
					items-center
					justify-center
					text-[#D96A57]
					text-xl
				">
				{icon}
			</div>

			<h3 className="mt-5 text-xl font-serif text-[#503125]">{title}</h3>

			<p className="mt-2 text-sm leading-6 text-[#806D61]">{description}</p>
		</div>
	);
};

export default Dashboard;
