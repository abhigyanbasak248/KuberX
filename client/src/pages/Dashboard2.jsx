import React from "react";
import { ChartContainer } from "@mui/x-charts";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import CanvasJSReact from "@canvasjs/react-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import TradingViewWidget from "../components/TradingViewWidget";
// import "./Dashboard2.css";

export const Dashboard2 = () => {
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
  return (
    <div className="bento flex  border-white w-full h-[100vh]  box-border p-2 gap-2">
      <div className="col1  flex-col  border-green-500 w-2/3 h-full">
        <div className="row1 flex h-[14%] p-1 gap-1">
          <div className="index  border-white rounded-3xl w-1/3 bg-stone-900 h-full flex justify-around items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke=""
              className="w-6 h-6"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                  fill="#ff0000"
                ></path>{" "}
              </g>
            </svg>
            <div className="text-[#ff0000] text-lg">NIFTY</div>
            <div className="text-[#ff0000] text-lg">22513.70</div>
            <div className="text-[#ff0000] text-xs">-0.95(+0.11%)</div>
          </div>
          <div className="index  border-white rounded-3xl w-1/3 bg-stone-900 h-full flex justify-around items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                  fill="#00FF00"
                ></path>{" "}
              </g>
            </svg>
            <div className="text-[#46c646] text-lg">SENSEX</div>
            <div className="text-[#46c646] text-lg">74248.22</div>
            <div className="text-[#46c646] text-xs">+20.59(+0.03%)</div>
          </div>
          <div className="index  border-white rounded-3xl w-1/3 bg-stone-900 h-full flex justify-around items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                  fill="#00FF00"
                ></path>{" "}
              </g>
            </svg>
            <div className="text-[#46c646] text-lg">INDIAVIX</div>
            <div className="text-[#46c646] text-lg">11.33</div>
            <div className="text-[#46c646] text-xs">+0.12(+1.05%)</div>
          </div>
        </div>
        <div className="row2 flex h-[57%]">
          <div className="income  border-pink-500 w-1/2">
            <ChartContainer
              width={400}
              height={300}
              series={[{ type: "line", data: pData }]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              sx={{
                ".MuiLineElement-root": {
                  stroke: "#8884d8",
                  strokeWidth: 2,
                },
                ".MuiMarkElement-root": {
                  stroke: "#8884d8",
                  scale: "0.6",
                  fill: "#fff",
                  strokeWidth: 2,
                },
              }}
              disableAxisListener
            >
              <LinePlot />
              <MarkPlot />
            </ChartContainer>
          </div>
          <div className="expense  border-pink-500 w-1/2 flex justify-center items-center">
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "green",
                  },
                },
              ]}
              height={200}
            />
          </div>
        </div>
        <div className="row3 flex h-[29%]">
          <div className="stocks  border-white w-1/2">
            <TradingViewWidget symbol="AAPL" className="w-full h-full" />
          </div>
          <div className="stocks  border-white w-1/2">
            <TradingViewWidget symbol="TSLA" className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="col2 flex-col  border-green-500 w-1/3 h-full">
        <div className="row1 h-2/3  border-white">NET BALANCE</div>
        <div className="row2 h-1/3  border-white">FRIENDS</div>
      </div>
    </div>
  );
};
