import React from "react";
import { useState } from "react";
import type { BirthDetailsFormValues } from "../../utils/types";
import DetailsForm from "./DetailsForm";

interface CoupleDetailsProps {
    coupleDetailsRef: React.RefObject<HTMLDivElement | null>;
}

const CoupleDetails: React.FC<CoupleDetailsProps> = (props) => {

    const initData: BirthDetailsFormValues = {
        "name": "",
        "day": "",
        "month": "",
        "year": "",
        "hour": "",
        "minute": "",
        "second": "",
        "place": ""
    }

    const [boyData, setBoyData] = useState<BirthDetailsFormValues>(initData);
    const [girlData, setGirlData] = useState<BirthDetailsFormValues>(initData);

    return (
        <div ref={props.coupleDetailsRef} className="min-h-screen w-full py-10 md:lg:py-2">
            <div className="flex flex-col items-center justify-center px-1 py-6 h-full lg:md:h-[100vh]">
                <div id="middle-box" className="md:lg:w-[35vw] w-[65vw] min-h-[5vh] lg:md:min-h-[6vh] bg-[linear-gradient(156deg,#3F5EFB_19%,#FC466B_100%)] rounded-t-lg shadow-lg ">
                    {/* Content for CoupleDetails goes here */}
                </div>

                {/* center container */}
                <div className="w-full h-full">
                    <div className="mx-[1vw] lg:md:mx-[2vw] border-4 border-purple-800/20 rounded-lg shadow-lg p-4 min-h-fit md:lg:h-full flex flex-col">
                        <div className="flex flex-col md:flex-row gap-4 lg:md:h-[85%]">

                            <div className="flex flex-col gap-5 items-center w-full h-full">
                                <div className="md:hidden bg-yellow-500 p-1 rounded-full border-4 border-yellow-300/50 shadow-lg">
                                    <img
                                        src="/boy-img.png"
                                        alt="Boy"
                                        className="md:hidden w-15 h-15 rounded-full object-cover shadow-lg"
                                    />
                                </div>
                                <DetailsForm
                                    boyData={boyData}
                                    girlData={girlData}
                                    setBoyData={setBoyData}
                                    setGirlData={setGirlData}
                                    gender={"male"}
                                />
                            </div>

                            <div className="hidden md:flex justify-center items-center w-6/12">
                                {/* vertical line */}
                                <img
                                    src="./couple.png"
                                    alt="Couple illustration"
                                    className="w-28 h-28 md:w-26 md:h-28 rounded-full object-cover shadow-lg"
                                />
                            </div>


                            <div className="flex flex-col gap-5 items-center w-full h-full ">
                                <div className="md:hidden bg-pink-500 p-1 rounded-full border-4 border-pink-300 mt-15">
                                    <img
                                        src="/girl-img.png"
                                        alt="Boy"
                                        className="md:hidden w-15 h-15 rounded-full object-cover shadow-lg"
                                    />
                                </div>
                                <DetailsForm
                                    boyData={boyData}
                                    girlData={girlData}
                                    setBoyData={setBoyData}
                                    setGirlData={setGirlData}
                                    gender={"female"}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: call your submit / navigation logic here
                                    console.log("Generate report clicked", { boyData, girlData });
                                }}
                                className="
                                px-10 py-3
                                rounded-full
                                text-sm font-semibold
                                text-yellow-950
                                bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500
                                shadow-[0_0_25px_rgba(250,204,9,0.9)]
                                hover:shadow-[0_0_35px_rgba(250,204,21,1)]
                                hover:brightness-110
                                active:scale-95
                                transition
                                "
                            >
                                Generate Report
                            </button>
                        </div>
                    </div>
                </div>



                <div id="middle-box" className="md:lg:w-[35vw] w-[65vw] min-h-[5vh] lg:md:min-h-[6vh] bg-[linear-gradient(156deg,#FC466B_19%,#3F5EFB_100%)] rounded-b-lg shadow-lg ">
                    {/* Content for CoupleDetails goes here */}
                </div>
            </div>
        </div>
    );
};

export default CoupleDetails;
