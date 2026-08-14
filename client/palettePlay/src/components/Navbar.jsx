import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<div className="  sticky  top-0 p-4 pl-8 pr-8 max-w-screen h-16  z-50 border-b border-[#BE8C73]/25 bg-[#fceed9] overflow-hidden">
			<div class="relative flex items-center justify-between z-50">
				<div className="w-35   ">
					<img src={logo} alt="SVG Studio" />
				</div>

				<div
					className=" hidden md:flex links text-[#5f2304]  gap-10 border-none mr-15  border-4
				 border-b-[#be8c73dd]">
					<NavLink
						to="/"
						end
						className={({ isActive }) =>
							`pb-1 focus-visible:outline-none ${isActive ? "border-b-2 border-[#5f2304] " : " hover:text-[#a8562c]"}`
						}>
						Home
					</NavLink>
					<NavLink
						to="/projects"
						end
						className={({ isActive }) =>
							` Nepb-1 focus-visible:outline-none text-[#5f2304] ${isActive ? "border-b-2 border-[#5f2304] " : " hover:text-[#a8562c]"}`
						}>
						Projects
					</NavLink>
					<NavLink
						to="/profile"
						end
						className={({ isActive }) =>
							`pb-1 focus-visible:outline-none text-[#5f2304]${isActive ? "border-b-2 border-[#5f2304] " : "text-white hover:text-[#a8562c]"}`
						}>
						Profile
					</NavLink>
				</div>
				{menuOpen && (
					<div
						className="fixed inset-0 bg-black/35 backdrop-blur-sm z-40 md:hidden"
						onClick={() => setMenuOpen(false)}
					/>
				)}
				<div
					className={`fixed top-0 right-0 h-screen w-[80vw]
bg-[#F6EFE5]
border-l border-[#D8C8B9]
z-50
shadow-2xl
transition-transform duration-300 ease-in-out
md:hidden
${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
					<div className="flex justify-end items-center p-5 border-b border-[#D8C8B9]">
						<button
							onClick={() => setMenuOpen(false)}
							className="text-3xl text-[#6A3B1E] hover:text-[#B46339] transition cursor-pointer">
							<FiX />
						</button>
					</div>
					<div className="flex flex-col mt-6">
						<NavLink
							to="/"
							end
							className={({ isActive }) =>
								`mx-4 my-1 rounded-xl px-6 py-4 transition
    ${
			isActive ? "bg-[#C88967] text-white" : "text-[#6A3B1E] hover:bg-[#EADCCF]"
		}`
							}
							onClick={() => setMenuOpen(false)}>
							Home
						</NavLink>
						<NavLink
							to="/projects"
							end
							className={({ isActive }) =>
								`mx-4 my-1 rounded-xl px-6 py-4 transition
    ${
			isActive ? "bg-[#C88967] text-white" : "text-[#6A3B1E] hover:bg-[#EADCCF]"
		}`
							}
							onClick={() => setMenuOpen(false)}>
							Projects
						</NavLink>
						<NavLink
							to="/profile"
							end
							className={({ isActive }) =>
								`mx-4 my-1 rounded-xl px-6 py-4 transition
    ${
			isActive ? "bg-[#C88967] text-white" : "text-[#6A3B1E] hover:bg-[#EADCCF]"
		}`
							}
							onClick={() => setMenuOpen(false)}>
							Profile
						</NavLink>
					</div>
				</div>

				<div className="flex gap-5 items-center">
					<button
						onClick={() => setMenuOpen(true)}
						className="md:hidden text-3xl text-[#6A3B1E] hover:text-violet-400 transition cursor-pointer  h-fit">
						<FiMenu />
					</button>
				</div>
			
			</div>
		</div>
	);
};

export default Navbar;
