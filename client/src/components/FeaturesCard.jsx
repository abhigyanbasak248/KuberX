import React from "react";

const FeaturesCard = ({ emoji, text }) => {
  return (
    <div className="w-full border border-[#1e1f4a] flex flex-col items-center justify-center h-32 py-4 rounded-2xl bg-[#080923]">
      <p className="text-3xl">{emoji} </p>
      <h2 className="text-center text-xl">{text}</h2>
    </div>
  );
};

export default FeaturesCard;
