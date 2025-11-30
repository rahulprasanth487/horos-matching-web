import React from "react";

interface HowItWorksProps {
  howItWorksRef: React.RefObject<HTMLDivElement | null>;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ howItWorksRef }) => {
  const poruthams = [
    {
      name: "Dina (Dinam)",
      basis: "Health, longevity, and prosperity",
      score: 6,
      explanation:
        "Ensures the couple will be healthy and live a long, prosperous life.",
    },
    {
      name: "Gana",
      basis: "Temperament and nature (Deva, Manushya, Rakshasa)",
      score: 6,
      explanation:
        "Checks compatibility of personalities and mental traits.",
    },
    {
      name: "Yoni",
      basis: "Sexual compatibility and intimacy",
      score: 4,
      explanation: "Assesses physical attraction and harmony.",
    },
    {
      name: "Rajju",
      basis: "Longevity and obstacles",
      score: 8,
      explanation: "Ensures long life and removal of obstacles.",
    },
    {
      name: "Rasi",
      basis: "Moon sign compatibility",
      score: 7,
      explanation: "Evaluates emotional stability and compatibility.",
    },
    {
      name: "Nadi",
      basis: "Health, genetic compatibility, and progeny",
      score: 8,
      explanation:
        "Examines health issues and genetic harmony for future offspring.",
    },
    {
      name: "Bhakut",
      basis: "Emotional and financial compatibility",
      score: 7,
      explanation:
        "Assesses emotional stability and financial prospects.",
    },
    {
      name: "Vedha",
      basis: "Removal of evils and pitfalls",
      score: 8,
      explanation:
        "Wards off negative influences and ensures happiness.",
    },
    {
      name: "Vasya",
      basis: "Mutual attraction and control",
      score: 2,
      explanation: "Ensures mutual love and affection.",
    },
    {
      name: "Mahendra",
      basis: "Progeny and wealth",
      score: 1,
      explanation: "Assures children and prosperity.",
    },
  ];

  return (
    <div
      ref={howItWorksRef}
      className="w-full min-h-screen py-16 px-4 sm:px-8 bg-gradient-to-b from-purple-100 via-pink-100 to-white"
    >
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 drop-shadow-sm mb-12">
        How It Works
      </h2>

      {/* Steps */}
      <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
        {[
          {
            title: "Enter Birth Details",
            desc: "Provide accurate birth details including date, time, and location for both individuals to generate birth charts.",
          },
          {
            title: "Fetch Coordinates",
            desc: "Automatically fetch latitude and longitude based on birth location for precise planetary calculations.",
          },
          {
            title: "Submit for Matching",
            desc: "Click 'Check Your Match' to begin analysis using advanced Vedic astrology algorithms.",
          },
          {
            title: "Receive Compatibility Report",
            desc: "Get a detailed, easy-to-understand compatibility report with scores and explanations.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-xl p-5 rounded-xl shadow-lg border border-white/40 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Porutham Section */}
      <h3 className="text-3xl font-semibold text-center text-gray-800 mt-16 mb-6">
        Vedic Matching Calculation
      </h3>

      <p className="text-center max-w-3xl mx-auto text-gray-700 mb-10">
        Vedic astrology evaluates compatibility using 10 Poruthams (Gunams).
        A score of 18/36 is generally considered good for marriage.
      </p>

      {/* Porutham Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {poruthams.map((p, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition p-5"
          >
            <h4 className="text-lg font-bold text-purple-700">{p.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{p.basis}</p>
            <p className="text-sm mt-2">
              <span className="font-semibold">Score:</span> {p.score}
            </p>
            <p className="text-gray-700 text-sm mt-2">{p.explanation}</p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-10 text-center">
        <p className="text-lg font-bold text-gray-800">
          Total Maximum Score: 57
        </p>
      </div>

      {/* Importance Section */}
      <h3 className="text-3xl font-semibold text-center text-gray-800 mt-16 mb-6">
        Importance of Vedic Matching
      </h3>

      <ul className="max-w-3xl mx-auto space-y-3 text-gray-700 text-sm sm:text-base">
        <li>
          <strong>Holistic Compatibility:</strong> Evaluates mental, emotional,
          physical, and spiritual harmony.
        </li>
        <li>
          <strong>Health & Longevity:</strong> Predicts life stability and
          well-being of the couple and future children.
        </li>
        <li>
          <strong>Family Harmony:</strong> Ensures alignment of values, upbringing,
          and social harmony.
        </li>
        <li>
          <strong>Cultural Importance:</strong> Reflects traditional practices
          deeply rooted in Vedic customs.
        </li>
      </ul>
    </div>
  );
};

export default HowItWorks;
