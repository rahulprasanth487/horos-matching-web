import React from "react";
import type { BirthDetailsFormValues } from "../../utils/types";
import { ArrowRightToLine, RotateCw, Loader } from "lucide-react";

interface DetailsFormProps {
  gender: "male" | "female";
  boyData: BirthDetailsFormValues;
  girlData: BirthDetailsFormValues;
  setBoyData: React.Dispatch<React.SetStateAction<BirthDetailsFormValues>>;
  setGirlData: React.Dispatch<React.SetStateAction<BirthDetailsFormValues>>;
}

const DetailsForm: React.FC<DetailsFormProps> = ({
  gender,
  boyData,
  girlData,
  setBoyData,
  setGirlData,
}) => {
  const setData = (
    updater: (prev: BirthDetailsFormValues) => BirthDetailsFormValues
  ) => {
    if (gender === "male") setBoyData(updater);
    else setGirlData(updater);
  };

  const handleChange =
    (field: any) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        try {
          if (field === "meridiem") {
            // Convert 12-hour to 24-hour format when meridiem changes
            setData((prev) => {
              let hour = parseInt(prev.hour, 10);
              if (e.target.value === "AM" && hour === 12) hour = 0;
              if (e.target.value === "PM" && hour !== 12) hour += 12;
              return { ...prev, [field]: e.target.value, hour: String(hour).padStart(2, "0") };
            });
          } else {
            const value = e.target.value;
            setData((prev) => ({ ...prev, [field]: value }));
          }
        } catch (error) {
          console.error("Error handling change:", error);
        }

      };



  const [statusOfLocation, setStatusOfLocation] =
    React.useState<"idle" | "fetching" | "fetched" | "error">("idle");
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);
  const [locationError, setLocationError] = React.useState<string | null>(null);

  const GEOAPIFY_API_KEY = import.meta.env.VITE_APP_GEOAPIFY_API_KEY || "";


  const fetchLocationCoordinates = async () => {
    const place = gender === "male" ? boyData.place : girlData.place;

    if (!place || place.trim().length < 3) {
      setStatusOfLocation("error");
      setLocationError("Please enter a valid place (city, district, pincode).");
      return;
    }

    if (!GEOAPIFY_API_KEY) {
      setStatusOfLocation("error");
      setLocationError("Geoapify API key is missing. Please contact support.");
      return;
    }

    setStatusOfLocation("fetching");
    try {
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        place
      )}&format=json&apiKey=${GEOAPIFY_API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        setStatusOfLocation("error")
        throw new Error("Network response was not ok");;
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const best = data.results[0]; // or choose with highest rank if you want
        setLatitude(best.lat);
        setLongitude(best.lon);
        setStatusOfLocation("fetched");

        if (gender === "male") {
          setBoyData((prevData) => ({
            ...prevData,
            latitude: best.lat.toString(),
            longitude: best.lon.toString(),
          }));
        } else if (gender === "female") {
          setGirlData((prevData) => ({
            ...prevData,
            latitude: best.lat.toString(),
            longitude: best.lon.toString(),
          }));
        }
      } else {
        setLatitude(null);
        setLongitude(null);
        setStatusOfLocation("error");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setLatitude(null);
      setLongitude(null);
      setStatusOfLocation("error");
    }
  };


  return (
    <div className="flex flex-col w-full gap-y-[3vh] h-full px-3 py-3 sm:px-4 sm:py-4 md:px-4 md:py-4 rounded-lg shadow-md justify-center bg-white/30 backdrop-blur-md border border-white/30">
      {/* Name (required) */}
      <div className="flex flex-col">
        <label className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base font-medium">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          placeholder="Full Name"
          onChange={handleChange("name")}
          className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2.5 md:px-3 md:py-3 text-sm sm:text-base md:text-md w-full"
        />
      </div>

      {/* Date of Birth (required) via dropdowns */}
      <div className="">
        <label className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base font-medium block">
          Date of Birth<span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          {/* Day */}
          <select
            required
            onChange={handleChange("day")}
            className="w-1/3 border border-gray-300 rounded-md px-2 py-2 text-sm sm:text-base md:text-base bg-white text-center"
          >
            <option value="" selected disabled>
              DD
            </option>
            {Array.from({ length: 31 }, (_, i) => {
              const v = String(i + 1).padStart(2, "0");
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>

          {/* Month */}
          <select
            required
            onChange={handleChange("month")}
            className="w-1/3 border border-gray-300 rounded-md text-sm sm:text-base md:text-base bg-white text-center"
          >
            <option value="" selected disabled>
              MM
            </option>
            {Array.from({ length: 12 }, (_, i) => {
              const v = String(i + 1).padStart(2, "0");
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>

          {/* Year */}
          <select
            required
            onChange={handleChange("year")}
            className="w-1/3 border border-gray-300 rounded-md text-sm sm:text-base md:text-base bg-white text-center"
          >
            <option value="" selected disabled>
              YYYY
            </option>
            {Array.from({ length: 81 }, (_, i) => {
              const year = 1950 + i;
              return (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Time of Birth (required) via dropdowns */}
      <div className="">
        <label className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base font-medium block">
          Time of Birth<span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          {/* Hour */}
          <select
            required
            onChange={handleChange("hour")}
            className="w-1/4 border border-gray-300 rounded-md text-sm sm:text-base md:text-base bg-white text-center"
          >
            <option value="" selected disabled>
              hh
            </option>
            {Array.from({ length: 12 }, (_, i) => {
              const v = String(i + 1).padStart(2, "0");
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>

          {/* Minute */}
          <select
            required
            onChange={handleChange("minute")}
            className="w-1/4 border border-gray-300 rounded-md text-sm sm:text-base md:text-base bg-white text-center"
          >
            <option value="" selected disabled>
              mm
            </option>
            {Array.from({ length: 60 }, (_, i) => {
              const v = String(i).padStart(2, "0");
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>

          {/* Seconds */}
          <select
            required
            onChange={handleChange("second")}
            className="w-1/4 border border-gray-300 rounded-md text-sm sm:text-base md:text-base bg-white text-center"
          >
            <option value="" selected disabled>
              ss
            </option>
            {Array.from({ length: 60 }, (_, i) => {
              const v = String(i).padStart(2, "0");
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>

          {/* AM / PM */}
          <select
            required
            onChange={handleChange("meridiem")}
            className="w-1/4 border border-gray-300 rounded-md px-2 py-2 text-sm sm:text-base md:text-base bg-white text-center"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/* Place of Birth (required) */}
      <div className="flex flex-col mb-1 sm:mb-2 lg:md:mb-3">
        <label className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base font-medium">
          Place of Birth<span className="text-red-500">*</span>
        </label>
        <div>
          <div className="flex items-center">
            <input
              required
              type="text"
              placeholder="City, District, PinCode.."
              onChange={handleChange("place")}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base md:text-base w-full"
            />
            {(statusOfLocation == "idle" || statusOfLocation == "fetched") && <ArrowRightToLine className="mx-2 text-gray-400 hover:text-black" onClick={() => { fetchLocationCoordinates() }} />}
            {statusOfLocation == "fetching" && <Loader className="mx-2 text-gray-400 animate-spin" />}
            {statusOfLocation == "error" && <RotateCw className="mx-2 text-red-500 animate-pulse" onClick={() => { fetchLocationCoordinates() }} />}
          </div>

          <div className={`mt-1 text-xs sm:text-sm md:text-sm text-gray-500 p-1 rounded-lg max-w-fit border-2 ${statusOfLocation === "error" ? "bg-red-100 border-red-200" : "bg-gray-100 border-gray-300"}`}>
            {statusOfLocation === "idle" && "Coordinates not fetched yet."}
            {statusOfLocation === "fetching" && "Fetching coordinates..."}
            {statusOfLocation === "fetched" &&
              latitude !== null &&
              longitude !== null && (
                <>Coordinates: Latitude {latitude.toFixed(4)}, Longitude {longitude.toFixed(4)}</>
              )}
            {statusOfLocation === "error" && locationError && (
              <span className="text-red-400">{locationError}</span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
