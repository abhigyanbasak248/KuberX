import React from "react";
import TradingViewWidget from "../components/TradingViewWidget";

function Portfolio() {
  const indices = ["NASDAQ:NVDA", "NASDAQ:MSFT"];
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {indices.map((index) => (
        <div key={index} className="p-4 border-2 rounded-lg min-h-[24rem] w-full">
          <TradingViewWidget symbol={index} />
        </div>
      ))}
    </div>
  );
}

export default Portfolio;