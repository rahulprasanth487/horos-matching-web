import React from "react";
import type { BirthDetailsFormValues } from "../../utils/types";

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
                } finally {
                    console.log("Current Data:",boyData,girlData);
                }

            };

  return (
    <div className="flex-1 w-full h-full px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 bg-white/80 rounded-lg shadow-md">
      {/* Name (required) */}
      <div className="flex flex-col mb-3 sm:mb-4 lg:md:mb-10 lg:md:mt-10">
        <label className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base font-medium">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          placeholder="Full Name"
          onChange={handleChange("name")}
          className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-sm sm:text-base md:text-lg w-full"
        />
      </div>

      {/* Date of Birth (required) via dropdowns */}
      <div className="mb-3 sm:mb-4 lg:md:mb-10">
        <label className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base font-medium block">
          Date of Birth<span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          {/* Day */}
          <select
            required
            onChange={handleChange("day")}
            className="w-1/3 border border-gray-300 rounded-md px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base md:text-lg bg-white text-center"
          >
            <option value="" disabled>
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
            className="w-1/3 border border-gray-300 rounded-md px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base md:text-lg bg-white text-center"
          >
            <option value="" disabled>
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
            className="w-1/3 border border-gray-300 rounded-md px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base md:text-lg bg-white text-center"
          >
            <option value="" disabled>
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
      <div className="mb-3 sm:mb-4 lg:md:mb-10">
        <label className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base font-medium block">
          Time of Birth<span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          {/* Hour */}
          <select
            required
            onChange={handleChange("hour")}
            className="w-1/4 border border-gray-300 rounded-md px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base md:text-lg bg-white text-center"
          >
            <option value="" disabled>
              HH
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
            className="w-1/4 border border-gray-300 rounded-md px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base md:text-lg bg-white text-center"
          >
            <option value="" disabled>
              MM
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
            className="w-1/4 border border-gray-300 rounded-md px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base md:text-lg bg-white text-center"
          >
            <option value="" disabled>
              SS
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
            className="w-1/4 border border-gray-300 rounded-md px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base md:text-lg bg-white text-center"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/* Place of Birth (required) */}
      <div className="flex flex-col mb-1 sm:mb-2 lg:md:mb-10">
        <label className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base font-medium">
          Place of Birth<span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          placeholder="City, Country"
          onChange={handleChange("place")}
          className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-sm sm:text-base md:text-lg w-full"
        />
      </div>
    </div>
  );
};

export default DetailsForm;
