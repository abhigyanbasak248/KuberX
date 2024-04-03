import React from "react";
import { Link } from "react-router-dom";
import FeaturesCard from "../components/FeaturesCard";
const Home = () => {
  const features = [
    { emoji: "💸", text: "Automated Expense Tracking" },
    { emoji: "📈", text: "Automated Personal Finance Management" },
    { emoji: "📊", text: "Automated Investment Portfolio Management" },
    { emoji: "🤖", text: "AI ChatBot" },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <section className="mt-5 w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <Link
            to="/dashboard"
            className="inline-flex border border-[#ffffff80] justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-white bg-[#181931ad] rounded-full hover:bg-[#0c0d1e]"
          >
            <span className="text-xs bg-[#272840] rounded-full text-white px-4 py-1.5 me-3">
              Latest Release
            </span>
            <span className="text-sm font-medium">
              Introducing Personalised Dashboard
            </span>
            <svg
              className="w-2.5 h-2.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </Link>
          <h1 className="mb-4 text-4xl font-normal tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Revolutionize your financial game <br /> with{" "}
            <span className="font-extrabold text-[#D7B2FF]">KuberX</span>
          </h1>
          <p className="mb-8 text-md font-light text-gray-300 lg:text-lg sm:px-16 lg:px-48">
            Unlock the power of your money with KuberX's innovative suite of
            financial solutions, <br />
            where financial dreams become reality and budgeting becomes an
            adventure.
          </p>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-[#b672ff] via-[#9637fc] to-[#7a00fc] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
          >
            Go to Dashboard
          </button>
        </div>
        <div className="w-3/4 mx-auto">
          <img
            className="rounded-lg"
            src="https://framerusercontent.com/images/7cluiGa2zIXh4KaBoIiX4Wd7g.png?scale-down-to=2048&lossless=1"
            alt="image description"
          />
        </div>
        <div className="mt-16 mb-16 flex items-center justify-around px-2 md:px-8 gap-8 w-full h-40">
          {features.map((feature, index) => (
            <FeaturesCard
              key={index}
              emoji={feature.emoji}
              text={feature.text}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
