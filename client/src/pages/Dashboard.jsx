import React from 'react';
import PieColor from '../components/Charts/Pie';
import BasicSparkLineCustomization from '../components/Charts/SparkLine';
import CompositionExample from '../components/Charts/Gauge';
import BarsDataset from '../components/Charts/Bar';
import LineAnimation from '../components/Charts/Line';
import Portfolio from '../components/Portfolio';

const Dashboard = () => {
  return (
    <div className="container mx-auto py-20 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wrap each chart container div with an additional div for overflow control */}
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-sm h-auto flex items-center justify-center p-4">
            <div className="w-full">
              <PieColor />
            </div>
          </div>
        </div>
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-sm h-auto flex items-center justify-center p-4">
            <div className="w-full">
              <BasicSparkLineCustomization />
            </div>
          </div>
        </div>
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-sm h-auto flex items-center justify-center p-4">
            <div className="">
              <CompositionExample />
            </div>
          </div>
        </div>

        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-sm h-auto flex items-center justify-center p-4">
            <div className="">
              <BarsDataset />
            </div>
          </div>
        </div>
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-sm h-auto flex items-center justify-center p-4">
            <div className="">
              <LineAnimation />
            </div>
          </div>
        </div>
        {/* This container can be adjusted as needed */}
        <div className="responsive-chart-container">
          <div className="bg-[#101124] rounded-sm h-auto flex items-center justify-center p-4">
          <div className="w-full">
              <Portfolio />
            </div>
          </div>
        </div>
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
