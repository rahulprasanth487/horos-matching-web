import React from "react";

interface FooterProps {
    homeRef: React.RefObject<HTMLDivElement | null>;
    coupleDetailsRef: React.RefObject<HTMLDivElement | null>;
    howItWorksRef: React.RefObject<HTMLDivElement | null>;
    aboutUsRef: React.RefObject<HTMLDivElement | null>;
}

const Footer: React.FC<FooterProps> = (props) => {
  const year = new Date().getFullYear();

  // ⭐ Added states for review form
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      alert("Please select a rating and write a comment.");
      return;
    }

    alert(`Review Submitted!\nRating: ${rating}\nComment: ${comment}`);

    setRating(0);
    setHover(0);
    setComment("");
  };

  return (
    <footer ref={props.aboutUsRef} className="w-full bg-gradient-to-t from-purple-200 to-pink-200 text-gray-700 pt-16 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-4">About Vedic Match</h3>
            <p className="text-sm leading-relaxed">
              Vedic Match uses traditional Vedic astrology principles with modern algorithms
              to deliver accurate compatibility reports. We aim to help couples build
              meaningful, healthy, and long-lasting relationships.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-700 cursor-pointer" onClick={() => props.homeRef.current?.scrollIntoView({ behavior: 'smooth' })}>Home</li>
              <li className="hover:text-purple-700 cursor-pointer" onClick={() => props.howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' })}>How It Works</li>
              <li className="hover:text-purple-700 cursor-pointer" onClick={() => props.coupleDetailsRef.current?.scrollIntoView({ behavior: 'smooth' })}>Compatibility Check</li>
            </ul>
          </div>

          {/* ⭐ UPDATED REVIEW FORM ⭐ */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-white/40">
            <h3 className="text-xl font-bold text-purple-700 mb-3">
              Add Your Review
            </h3>

            {/* Rating */}
            <label className="text-sm font-medium text-gray-700">Your Rating:</label>
            <div className="flex text-2xl mb-3 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer transition select-none ${
                    (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Comment Box */}
            <textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm mb-3"
              rows={3}
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-purple-300/60 mt-14 pt-6"></div>

        {/* COPYRIGHT BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm pb-6">
          <p className="text-gray-700">
            © {year} Vedic Match. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0 text-gray-700">
            Designed with ❤️ for meaningful connections.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
