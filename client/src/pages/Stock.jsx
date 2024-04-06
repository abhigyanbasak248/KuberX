import React from "react";
import TradingViewWidget from "../components/TradingViewWidget";

function Stock() {
  const indices1 = ["NASDAQ:AAPL", "NASDAQ:NVDA"];
  const indices2 = ["NASDAQ:AAPL", "NASDAQ:NVDA"];
  const marketindices = ["NASDAQ", "NIFTY", "SENSEX", "DOW JONES", "S&P 500"]
  const stockInfo = [
    { name: 'Company A', price: '$100', change: '+1.5%' },
    { name: 'Company B', price: '$200', change: '-0.5%' },
    { name: 'Company C', price: '$150', change: '+0.8%' },
    { name: 'Company A', price: '$100', change: '+1.5%' },
    { name: 'Company B', price: '$200', change: '-0.5%' },
    { name: 'Company C', price: '$150', change: '+0.8%' },
    { name: 'Company A', price: '$100', change: '+1.5%' },
    { name: 'Company B', price: '$200', change: '-0.5%' },
    { name: 'Company C', price: '$150', change: '+0.8%' },
    { name: 'Company B', price: '$200', change: '-0.5%' },
    { name: 'Company C', price: '$150', change: '+0.8%' },
    { name: 'Company A', price: '$100', change: '+1.5%' },
    { name: 'Company B', price: '$200', change: '-0.5%' },
    { name: 'Company C', price: '$150', change: '+0.8%' },
    // Add more company stock info here
  ];

  return (
    <>
      <div className="container mx-auto p-4 flex justify-between max-w-7xl">
        {marketindices.map((index, idx) => (
          <div key={idx} className="text-center px-4 py-2 m-1 bg-blue-700 rounded-md shadow-lg flex-grow">
            {index}
          </div>
        ))}
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices1.map((index) => (
          <div key={index} className="p-4 border-2 border-green-400 rounded-lg min-h-[24rem]">
            <TradingViewWidget symbol={index} />
          </div>
        ))}
        <div className="md:col-span-1 md:row-span-2 p-4 border-2 border-blue-400 rounded-lg flex flex-col">
          {stockInfo.map((stock, index) => (
            <div key={index} className={`flex justify-between items-center p-2 my-2 ${stock.change.startsWith('+') ? 'bg-green-400' : 'bg-red-400'} rounded-md`}>
              <span>{stock.name}</span>
              <span>{stock.price}</span>
              <span className={`font-bold ${stock.change.startsWith('+') ? 'text-green-700' : 'text-red-700'}`}>{stock.change}</span>
            </div>
          ))}
        </div>
        {indices2.map((index) => (
          <div key={index} className="p-4 border-2 border-green-400 rounded-lg min-h-[24rem]">
            <TradingViewWidget symbol={index} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Stock;
