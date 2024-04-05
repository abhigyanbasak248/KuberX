import React from 'react';
import BasicSparkLineCustomization from '../components/Charts/SparkLine';
import CompositionExample from '../components/Charts/Gauge';
import BarsDataset from '../components/Charts/Bar';
import LineAnimation from '../components/Charts/Line';
import Portfolio from '../components/Portfolio';
import PieChartWithCustomizedLabel from '../components/Charts/Pie';


const Dashboard = () => {
  return (
    <div className="container mx-auto py-20 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wrap each chart container div with an additional div for overflow control */}
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-md h-auto flex items-center justify-center p-4">
            <div className="">
              <h1>Monthly Expenses and Savings</h1>
              <PieChartWithCustomizedLabel />
            </div>
          </div>
        </div>
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-md h-auto flex items-center justify-center p-4">
            <div className="w-full">
              <h1>Your Portfolio Valuation:</h1>
              <BasicSparkLineCustomization />
            </div>
          </div>
        </div>
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-md h-auto flex items-center justify-center p-4">
          <div className="w-full">
            <h1>Portfolio:</h1>
              <Portfolio />
            </div>
          </div>
        </div>
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-md h-auto flex items-center justify-center p-4">
            <div className="">
              <h1>Credit Score</h1>
              <CompositionExample />
            </div>
          </div>
        </div>

        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-md h-auto flex items-center justify-center p-4">
            <div className="">
              <BarsDataset />
            </div>
          </div>
        </div>
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-md h-auto flex items-center justify-center p-4">
            <div className="">
              <LineAnimation />
            </div>
          </div>
        </div>
        {/* This container can be adjusted as needed */}
        
      </div>

      {/* Responsive CSS for overflow control */}
      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-chart-container {
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
