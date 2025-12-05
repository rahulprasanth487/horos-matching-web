import React from "react";
import { useState } from "react";
import DetailsForm from "./DetailsForm";
import type { BirthDetailsFormValues } from "../../utils/types";

interface CoupleDetailsProps {
    coupleDetailsRef: React.RefObject<HTMLDivElement | null>;
    boyData: BirthDetailsFormValues;
    girlData: BirthDetailsFormValues;
    setBoyData: React.Dispatch<React.SetStateAction<BirthDetailsFormValues>>;
    setGirlData: React.Dispatch<React.SetStateAction<BirthDetailsFormValues>>;
    setMatchedResponse: React.Dispatch<React.SetStateAction<any>>;
    matchedRef: React.RefObject<HTMLDivElement | null>
}

const CoupleDetails: React.FC<CoupleDetailsProps> = (props) => {

    const [errorMessage, setErrorMessage] = useState<string>("");

    const generateCoordinatesForMissingLocations = async (place: string) => {
        try {
            const GEOAPIFY_API_KEY = import.meta.env.VITE_APP_GEOAPIFY_API_KEY || "";

            const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
                place
            )}&format=json&apiKey=${GEOAPIFY_API_KEY}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");;
            }

            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new Error("No coordinates found");
            }

            const best = data.results[0];
            console.log(`Fetched coordinates for ${place}: Lat ${best.lat}, Lon ${best.lon}`);
            return {
                latitude: best.lat.toString(),
                longitude: best.lon.toString(),
            };
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    }

    const validateFormData = async (): Promise<{
        ok: boolean;
        boy: BirthDetailsFormValues;
        girl: BirthDetailsFormValues;
    }> => {
        const requiredFields: (keyof BirthDetailsFormValues)[] = ["name", "day", "month", "year", "hour", "minute", "place"];
        let hasError = false;

        for (const field of requiredFields) {
            if (!props.boyData[field] || !props.girlData[field]) {
                hasError = true;
                break;
            }
        }

        if (hasError) {
            setErrorMessage("Please fill in all required fields for both boy and girl.");
            return { ok: false, boy: props.boyData, girl: props.girlData };
        }

        let boy = { ...props.boyData };
        let girl = { ...props.girlData };

        try {
            if (!boy.latitude || !boy.longitude) {
                const coords = await generateCoordinatesForMissingLocations(boy.place);
                boy = { ...boy, ...coords };
                props.setBoyData(boy);
            }

            if (!girl.latitude || !girl.longitude) {
                const coords = await generateCoordinatesForMissingLocations(girl.place);
                girl = { ...girl, ...coords };
                props.setGirlData(girl);
            }
        } catch (e) {
            console.error("Error generating coordinates:", e);
            setErrorMessage("Error fetching location coordinates.");
            return { ok: false, boy, girl };
        }

        setErrorMessage("");
        return { ok: true, boy, girl };
    };


    const sendCoupleDetailsForMatching = async () => {
        const { ok, boy, girl } = await validateFormData();
        if (!ok) return;

        console.log("Sending data to backend for matching...");
        const request = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/match`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ boy, girl }),
        });

        const response = await request.json();
        props.setMatchedResponse(response);

        if (response) {
            props.matchedRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div ref={props.coupleDetailsRef} className="min-h-screen w-full py-10 md:lg:py-2">
            <div className="flex flex-col items-center justify-center px-1 py-6 h-full lg:md:h-[100vh] md:mt-1">
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
                                    boyData={props.boyData}
                                    girlData={props.girlData}
                                    setBoyData={props.setBoyData}
                                    setGirlData={props.setGirlData}
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
                                    boyData={props.boyData}
                                    girlData={props.girlData}
                                    setBoyData={props.setBoyData}
                                    setGirlData={props.setGirlData}
                                    gender={"female"}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    sendCoupleDetailsForMatching();
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
                                Check Your Match
                            </button>
                        </div>
                        {
                            errorMessage.length != 0 &&
                            <div className="mt-2 text-center text-red-500 text-sm h-5">
                                {errorMessage}
                            </div>
                        }
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
