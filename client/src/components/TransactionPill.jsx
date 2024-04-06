import React from 'react'

export const TransactionPill = () => {
  return (
    <div className="w-4/5 h-1/5 mb-4 bg-stone-800 rounded-3xl flex shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] ">
      <div className="flex-col justify-center items-center p-2 w-[10%] ml-4 mt-1">
        <svg
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#FFFFFF"
          className="w-6 h-6 mb-1"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"></path>
          </g>
        </svg>
        <div className="text-xs">06 Apr</div>
      </div>
      <div className=" w-[70%] p-2 flex justify-around items-center">
        <div className="w-2/3 flex">
          <div className="flex justify-center items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
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
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="#FF0000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="flex-col ml-4">
            <div className="text-lg">Sagnik</div>
            <div className="text-xs text-stone-500">
              Cell Phones & Accessories
            </div>
            <div className="text-xs text-stone-500 mb-1">Wire</div>
          </div>
        </div>
        <div className="text-xs p-3 flex justify-center items-center text-whit">
          Transaction ID:
          <p className="text-stone-500">(6610d28ef49d69c17ff5afdf)</p>{" "}
        </div>
      </div>
      <div className=" w-[20%] flex justify-center items-center">250.00</div>
    </div>
  );
}
