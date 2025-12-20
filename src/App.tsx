// App.tsx
import React from "react";
import { useRef, useState } from "react";
import LandingPage from "./components/LandingPage";
import CoupleDetails from "./components/CoupleDetails/CoupleDetails";
import type { BirthDetailsFormValues } from "./utils/types";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import MacthedContent from "./components/PostMatch/MatchedContent";
import MatchErrorBoundary from "./components/PostMatch/MatchErrorBoundary";

import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const coupleDetailsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const matchedRef = useRef<HTMLDivElement>(null);

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

  const [matchedResponse, setMatchedResponse] = useState<any>(null);

  return (
    <div id="main-container" className="">
      <div id="landing-page">
        <LandingPage coupleDetailsRef={coupleDetailsRef} howItWorksRef={howItWorksRef} aboutUsRef={aboutUsRef} homeRef={homeRef} />
      </div>
      <div id="user-details">
        <CoupleDetails coupleDetailsRef={coupleDetailsRef}
          boyData={boyData}
          girlData={girlData}
          setBoyData={setBoyData}
          setGirlData={setGirlData}
          setMatchedResponse={setMatchedResponse}
          matchedRef={matchedRef}
        />
      </div>
      <div id="matched-content">
        {matchedResponse?.status_code === 200 ? (
          <MatchErrorBoundary>
            <MacthedContent matchedResponse={matchedResponse} matchedRef={matchedRef} />
          </MatchErrorBoundary>
        ) : matchedResponse ? (
          // status present but not 200
          <div className="flex items-center mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 ">
            Could not generate the compatibility report. Please check the details and
            try again.
          </div>
        ) : null}
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

      <Analytics />
    </div>
  );
};

export default App;
