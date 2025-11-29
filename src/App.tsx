// App.tsx
import React from "react";
import { useRef } from "react";
import LandingPage from "./components/LandingPage";
import CoupleDetails from "./components/CoupleDetails/CoupleDetails";

const App: React.FC = () => {

  const coupleDetailsRef = useRef<HTMLDivElement>(null);

  return (
    <div id="main-container" className="">
      <div id="landing-page">
        <LandingPage coupleDetailsRef={coupleDetailsRef} />
      </div>
      <div id="user-details">
        <CoupleDetails coupleDetailsRef={coupleDetailsRef} />
      </div>
      <div>
        Hello 
      </div>
    </div>
  );
};

export default App;
