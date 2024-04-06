import React from 'react';
import TradingViewWidget from '../components/TradingViewWidget';

function Stock() {
  const indices1 = ['NASDAQ:AAPL', 'NASDAQ:NVDA'];
  const indices2 = ["NASDAQ:AMZN", "NASDAQ:MSFT"];
  const marketIndicesLinks = {
    NASDAQ: 'https://www.tradingview.com/symbols/NASDAQ-NDX/',
    NIFTY: 'https://www.tradingview.com/symbols/NSE-NIFTY/components/',
    SENSEX: 'https://www.tradingview.com/symbols/BSE-SENSEX/',
    'DOW JONES': 'https://www.tradingview.com/symbols/DJ-DJI/',
    'S&P 500': 'https://www.tradingview.com/symbols/SPX/?exchange=SP'
  };
  const marketindices = Object.keys(marketIndicesLinks);
  
  const stockInfo = [
    { name: 'Apple Inc.', symbol: 'AAPL', price: '169.58 USD', change: '+0.45%' },
    { name: 'Berkshire Hathaway Inc.', symbol: 'BRK.A', price: '631255.02 USD', change: '+0.45%' },
    { name: 'Alphabet Inc.', symbol: 'GOOG', price: '153.94 USD', change: '+1.32%' },
    { name: 'Microsoft Corporation', symbol: 'MSFT', price: '425.52 USD', change: '+1.83%' },
    { name: 'JP Morgan Chase & Co.', symbol: 'JPM', price: '197.45 USD', change: '+0.92%' },
    { name: 'Meta Platforms, Inc.', symbol: 'META', price: '527.34 USD', change: '+3.21%' },
    { name: 'Exxon Mobil Corporation', symbol: 'XOM', price: '121.37 USD', change: '+1.38%' },
    { name: 'Amazon.com, Inc.', symbol: 'AMZN', price: '185.07 USD', change: '+2.82%' },
    { name: 'NVIDIA Corporation', symbol: 'NVDA', price: '880.08 USD', change: '+2.45%' },
    { name: 'Bank of America Corporation', symbol: 'BAC', price: '37.11 USD', change: '+0.51%' },
    { name: 'UnitedHealth Group Incorporated', symbol: 'UNH', price: '455.74 USD', change: '+0.08%' },
    { name: 'Chevron Corporation', symbol: 'CVX', price: '161.60 USD', change: '+0.57%' },
    { name: 'Wells Fargo & Company', symbol: 'WFC', price: '57.40 USD', change: '+1.27%' },
    { name: 'Visa Inc.', symbol: 'V', price: '277.14 USD', change: '+1.15%' },
    { name: 'Walmart Inc.', symbol: 'WMT', price: '59.85 USD', change: '+0.59%' },
    { name: 'Comcast Corporation', symbol: 'CMCSA', price: '40.90 USD', change: '-0.51%' },
    { name: 'RELIANCE INDUSTRIES LTD.', symbol: 'RELIANCE', price: '2919.95 INR', change: '-0.22%' },
    { name: 'TATA CONSULTANCY SERVICES LTD.', symbol: 'TCS', price: '3979.55 INR', change: '-0.59%' },
    { name: 'HDFC BANK LTD.', symbol: 'HDFCBANK', price: '1549.40 INR', change: '+1.41%' },
    { name: 'ICICI BANK LTD.', symbol: 'ICICIBANK', price: '1082.35 INR', change: '+0.51%' },
    { name: 'STATE BANK OF INDIA', symbol: 'SBIN', price: '764.35 INR', change: '+0.67%' },
    { name: 'BHARTI AIRTEL LTD.', symbol: 'BHARTIARTL', price: '1191.55 INR', change: '-1.28%' },
    { name: 'INFOSYS LTD.', symbol: 'INFY', price: '1479.50 INR', change: '-0.48%' },
    { name: 'ITC LTD.', symbol: 'ITC', price: '427.85 INR', change: '+1.21%' },
    // ... add more companies as needed
  ];

  const getRandomCompanies = (stockList, count) => {
    const shuffled = [...stockList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomStockInfo = getRandomCompanies(stockInfo, 12);

  return (
    <>
      <div className="container mx-auto p-4 flex justify-between max-w-full">
      {marketindices.map((index, idx) => (
          <a key={idx} href={marketIndicesLinks[index]} target="_blank" rel="noopener noreferrer" className="text-center px-4 py-2 m-1 bg-blue-700 text-white rounded-md shadow-lg flex-grow">
            {index}
          </a>
        ))}
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices1.map((index) => (
          <div key={index} className="p-4 border-2 border-green-400 rounded-lg min-h-[24rem]">
            <TradingViewWidget symbol={index} />
          </div>
        ))}
        <div className="md:col-span-1 md:row-span-2 p-4 border-2 border-blue-400 rounded-lg flex flex-col">
          {randomStockInfo.map((stock, index) => (
            <div key={index} className={`flex justify-between items-center p-2 my-2 ${stock.change.startsWith('+') ? 'bg-green-400' : 'bg-red-400'} rounded-md`}>
              <span>{stock.symbol} - {stock.name}</span>
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
