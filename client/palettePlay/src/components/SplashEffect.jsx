import purpleSplash from "../assets/images/purpleSplash.png";
import blueSplash from "../assets/images/blueSplash.png";
import splash from "../assets/images/splash.png";
import leftLeaf from "../assets/images/leftLeaf.png";
import rightLeaf from "../assets/images/rightLeaf.png";

const SplashEffect = () => {
  return (
    <div >
        <div class="absolute -right-30 -top-20 md:-right-50 md:-top-20 -z-10">
              <img src={splash} className=" w-[80vw] md:w-[50vw] " />
            </div>
            <div class="absolute  right-50 -top-30 -z-10">
              <img src={splash} className=" w-[80vw] md:w-[50vw] " />
            </div>
           
            <div class="absolute -right-100 -bottom-40 -z-10">
              <img src={blueSplash} className="w-[50vw] opacity-70" />
            </div>
            <div class="absolute -left-60 top-40 -z-10 block lg:hidden ">
              <img src={blueSplash} className="w-[90vw] opacity-70" />
            </div>
            <div class="absolute -left-80 -bottom-40 -z-10">
              <img src={blueSplash} className="w-[50vw] opacity-70" />
            </div>
          
            <div class="absolute left-0    -z-10">
              <img src={leftLeaf} />
            </div>
            <div class="absolute left-0 bottom-220 -z-10">
              <img src={leftLeaf} />
            </div>
            <div class="absolute  -left-30 bottom-220 block lg:hidden  -z-10">
              <img src={blueSplash} className="w-[80vw] md:w-[50vw] opacity-50" />
            </div>
            <div class="absolute  -right-30 bottom-220 block lg:hidden  -z-10">
              <img src={purpleSplash} className="w-[80vw] md:w-[50vw] opacity-50" />
            </div>
            <div class="absolute  -right-30 bottom-230 block lg:hidden  -z-10">
              <img src={splash} className="w-[80vw] md:w-[50vw] opacity-50" />
            </div>
            <div class="absolute  -right-30 bottom-150 block lg:hidden  -z-10">
              <img src={blueSplash} className="w-[80vw] md:w-[50vw] opacity-50" />
            </div>
            <div class="absolute right-0 -bottom-50 -z-10">
              <img src={rightLeaf} />
            </div>
            <div class="absolute right-110 -bottom-50 -z-10">
              <img src={splash} />
            </div>
            <div class="absolute right-50 -bottom-45 -z-10">
              <img src={splash} />
            </div>
            <div class="absolute left-20 -bottom-100 -z-10">
              <img src={leftLeaf} />
            </div>
    </div>
  )
}

export default SplashEffect
