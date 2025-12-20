import React from "react";
import { useState } from "react";
import DetailsForm from "./DetailsForm";
import type { BirthDetailsFormValues } from "../../utils/types";
import { AlertCircle } from "lucide-react";

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
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [genderValidation,setGenderValidation] = useState<{"person1":string,"person2":string}>({"person1":"male","person2":"female"});

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
        if (genderValidation.person1 === genderValidation.person2) {
            setErrorMessage("Same gender selected. Vedic system does not work for same gender.");
            setShowErrorDialog(true);
            return { ok: false, boy: props.boyData, girl: props.girlData };
        }

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
            setShowErrorDialog(true);
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
            setShowErrorDialog(true);
            return { ok: false, boy, girl };
        }

        setErrorMessage("");
        return { ok: true, boy, girl };
    };


    const sendCoupleDetailsForMatching = async () => {
        setLoading(true); // Start loading
        const { ok, boy, girl } = await validateFormData();
        if (!ok) {
            setLoading(false);
            return;
        }

        console.log("Sending data to backend for matching...");
        try {
            const request = await fetch(`/api/match`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ boy, girl }),
            });

            const response = await request.json();
            props.setMatchedResponse(response);

            setTimeout(() => {
                props.matchedRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        } catch (error) {
            console.error("Error during matching:", error);
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div ref={props.coupleDetailsRef} className="min-h-screen w-full py-10 md:lg:py-2">
            <div className="flex flex-col items-center justify-center px-1 py-6 h-full lg:md:h-[110vh] md:mt-1">
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
                                    genderValidation={genderValidation}
                                    setGenderValidation={setGenderValidation}
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
                                    genderValidation={genderValidation}
                                    setGenderValidation={setGenderValidation}
                                />
                            </div>
                        </div>


                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    sendCoupleDetailsForMatching();
                                }}
                                disabled={loading}
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
                                {
                                    loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Check Your Match"
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error Dialog */}
                {showErrorDialog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4">
                            <div className="flex items-center gap-4 mb-6">
                                <AlertCircle className="text-red-600 w-10 h-10 flex-shrink-0" />
                                <h2 className="text-2xl font-bold text-gray-900">Important</h2>
                            </div>
                            <p className="text-gray-800 mb-4 text-base font-semibold">
                                {errorMessage === "Same gender selected. Vedic system does not work for same gender." 
                                    ? "Same Gender Selected" 
                                    : "Error"}
                            </p>
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                                {errorMessage === "Same gender selected. Vedic system does not work for same gender."
                                    ? "The Vedic astrological matching system is specifically designed to analyze the compatibility between a male and female horoscope. It evaluates various aspects such as Guna matching, Dasha compatibility, and planetary positions relative to both partners' birth charts.\n\nThis system cannot function with same-gender pairs as it relies on complementary energies and traditional astrological principles that are based on male-female dynamics. Please select different genders to proceed with the compatibility check."
                                    : errorMessage
                                }
                            </p>
                            <button
                                onClick={() => setShowErrorDialog(false)}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

                <div id="middle-box" className="md:lg:w-[35vw] w-[65vw] min-h-[5vh] lg:md:min-h-[6vh] bg-[linear-gradient(156deg,#FC466B_19%,#3F5EFB_100%)] rounded-b-lg shadow-lg ">
                    {/* Content for CoupleDetails goes here */}
                </div>
            </div>
        </div>
    );
};

export default CoupleDetails;
