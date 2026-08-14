import { FiShield,FiGrid,FiSliders,FiColumns } from "react-icons/fi";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <div className="relative flex flex-col gap-3 max-w-6xl justify-center items-center mx-auto p-4 z-10 pb-10" >
      <h1 className="text-[#503125] font-bold text-2xl md:text-3xl font-serif">Why artists love PalettePlay</h1>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 ">
      <FeatureCard icon={FiShield} heading={"Keep Original Safe"} desc={"Your line are stays exactly the same"}/>
      <FeatureCard icon={FiGrid} heading={"Unlimited Variations"} desc={"Discover unique color stories in seconds."}/>
      <FeatureCard icon={FiSliders} heading={"Mood Based Coloring"} desc={"From dreamy sunsets to cozy cafés"}/>
      <FeatureCard icon={FiColumns} heading={"Easy Comparison"} desc={"Compare side by side and pick your Favourite."}/>
    </div>
    </div>
  )
}

export default FeaturesSection
