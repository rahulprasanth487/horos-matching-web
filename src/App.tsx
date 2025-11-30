// App.tsx
import React from "react";
import { useRef, useState } from "react";
import LandingPage from "./components/LandingPage";
import CoupleDetails from "./components/CoupleDetails/CoupleDetails";
import type { BirthDetailsFormValues } from "./utils/types";

const App: React.FC = () => {

  const coupleDetailsRef = useRef<HTMLDivElement>(null);

  const initData: BirthDetailsFormValues = {
          "name": "",
          "day": "",
          "month": "",
          "year": "",
          "hour": "",
          "minute": "",
          "second": "",
          "place": "",
          "latitude": "",
          "longitude": ""
      }
  
      const [boyData, setBoyData] = useState<BirthDetailsFormValues>(initData);
      const [girlData, setGirlData] = useState<BirthDetailsFormValues>(initData);

  return (
    <div id="main-container" className="">
      <div id="landing-page">
        <LandingPage coupleDetailsRef={coupleDetailsRef} />
      </div>
      <div id="user-details">
        <CoupleDetails coupleDetailsRef={coupleDetailsRef} 
          boyData={boyData}
          girlData={girlData}
          setBoyData={setBoyData}
          setGirlData={setGirlData}
        />
      </div>
      <div>
        Hello 
      </div>
    </div>
  );
};

export default App;
