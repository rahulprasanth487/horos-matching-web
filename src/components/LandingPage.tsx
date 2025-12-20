import React from "react";
import "./styles/LandingPage.css";
import Navbar from "./Navbar";
import { ChevronDown } from "lucide-react";

interface LandingPageProps {
    homeRef: React.RefObject<HTMLDivElement | null>;
    coupleDetailsRef: React.RefObject<HTMLDivElement | null>;
    howItWorksRef: React.RefObject<HTMLDivElement | null>;
    aboutUsRef: React.RefObject<HTMLDivElement | null>;
}

const LandingPage: React.FC<LandingPageProps> = (props) => {
    return (
        <div id="landing-page-container"
            ref={props.homeRef}
            className="w-full min-h-screen grid grid-rows-[auto,1fr]"
        >
            <Navbar howItWorksRef={props.howItWorksRef} aboutUsRef={props.aboutUsRef}/>

            <div className="flex justify-center h-full">
                <div className="relative flex justify-center mb-[10vh] xs:mb-[25vh] mt-30">
                    <img
                        src="./astro-ring.png"
                        alt="Zodiac ring"
                        className="
                            w-48 h-48       /* mobile */
                            sm:w-72 sm:h-72     /* small screens */
                            md:w-92 md:h-92     /* tablets */
                            xl:lg:w-[390px] lg:h-[390px]  /* desktop */
                            origin-center animate-spin-slow
                        "
                    />
                </div>

                {/* Button */}
                <button
                    className="
                        absolute bottom-30
                        px-8 py-3
                        rounded-lg font-bold text-gray-900
                        bg-gradient-to-b from-yellow-300 to-yellow-500

                        /* gold glow */
                        shadow-[0_0_25px_rgba(250,204,21,15.9)]
                        ring-2 ring-yellow-400/80

                        /* hover: stronger glow */
                        hover:shadow-[0_0_40px_rgba(250,204,21,1)]
                        hover:ring-4 hover:ring-yellow-200/90

                        transition-all duration-300
                    "
                    onClick={() => props.coupleDetailsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                    CHECK YOUR MATCH
                </button>

                {/* Glassy bar */}
                <div
                    className="
                    mt-4
                    w-[90vw] max-w-xl
                    px-6 py-3
                    rounded-2xl
                    bg-white/10
                    border border-white/30
                    shadow-lg
                    backdrop-blur-md
                    flex flex-col items-center justify-center gap-1
                    absolute bottom-5
                    "
                    onClick={() => props.coupleDetailsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="text-sm sm:text-base text-white">
                    Explore Compatibility based on Zodiac Signs
                    </span>
                    <span className="text-xl text-white">
                        <ChevronDown size={24} />
                    </span>
                </div>

            </div>

        </div>
    );
}

export default LandingPage;