import React from "react";
import TradingViewWidget from "../components/TradingViewWidget";
function Stock() {
  const indices = ["NASDAQ:AAPL", "NASDAQ:GOOGL", "NASDAQ:AMZN", "NASDAQ:MSFT"];
  return (
    <div className="border-green-400 border-2">
      {indices.map((index) => <TradingViewWidget key={index} symbol={index} />)}
    </div>
  );
}

export default Stock;
