// App.tsx
import React from "react";
import { useRef, useState } from "react";
import LandingPage from "./components/LandingPage";
import CoupleDetails from "./components/CoupleDetails/CoupleDetails";
import type { BirthDetailsFormValues } from "./utils/types";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const coupleDetailsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);

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
        <LandingPage coupleDetailsRef={coupleDetailsRef} howItWorksRef={howItWorksRef} aboutUsRef={aboutUsRef} homeRef={homeRef}/>
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
        <HowItWorks howItWorksRef={howItWorksRef} /> 
      </div>
      <div>
        <Footer
          coupleDetailsRef={coupleDetailsRef}
          howItWorksRef={howItWorksRef}
          homeRef={homeRef}
          aboutUsRef={aboutUsRef}
        />
      </div>
    </div>
  );
};

export default App;
