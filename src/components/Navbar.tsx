import React, { useState } from "react";
import kumbh from "/kumbh.svg";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Glass navbar (stays in DOM, but will be covered by the panel) */}
      <header className="absolute top-0 left-0 right-0 z-40 flex justify-center px-4 py-3">
        <nav className="w-full max-w-5xl rounded-full border border-white/15 bg-white/5 bg-clip-padding px-4 py-2 backdrop-blur-lg shadow-lg flex items-center justify-between">
          {/* Logo + title */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden">
              <img src={kumbh} alt="Logo" className="h-10 w-10" />
            </div>
            <span className="text-sm sm:text-lg font-semibold tracking-wide text-yellow-100">
              Vedic MatchMaker
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-3">
            <button className="rounded-full bg-yellow-700/80 px-4 py-1.5 text-sm font-medium text-slate-100 hover:bg-yellow-600 transition">
              How it works
            </button>
            <button className="rounded-full bg-yellow-700/80 px-4 py-1.5 text-sm font-medium text-slate-100 hover:bg-yellow-600 transition">
              About us
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full bg-yellow-700/90 p-2 text-white hover:bg-yellow-600 transition"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Backdrop + FULL overlay panel (covers navbar) */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Slide panel: starts from right, full height, covers navbar */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-blue-700/25 text-slate-900 shadow-2xl
          transform transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel header with logo + name + close icon */}
          <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-yellow-900/40">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-700/60 overflow-hidden">
                <img src={kumbh} alt="Logo" className="h-9 w-9" />
              </div>
              <span className="text-base font-semibold text-white">
                Vedic MatchMaker
              </span>
            </div>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white hover:bg-yellow-700 transition"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex flex-col gap-2 px-5 pt-4">
            <button className="flex items-center justify-between rounded-none border-b border-yellow-700/90 py-3 text-sm font-medium text-white">
              How it works
            </button>
            <button className="flex items-center justify-between rounded-none border-b border-yellow-700/90 py-3 text-sm font-medium text-white">
              About us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
