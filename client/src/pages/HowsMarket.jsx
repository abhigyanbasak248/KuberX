import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#233601",
  border: "3px solid white",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const HowsMarket = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full z-4 -mt-28 ">
      <section className="bg-center h-screen bg-no-repeat bg-[url('https://images4.alphacoders.com/133/1338472.png')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            How's the market?💹
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Search for your favorite stocks/companies and get the latest
            information on the market.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <button
              onClick={handleOpen}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 "
            >
              Get market info
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <Modal
              className="w-full"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form
                  className="max-w-md mx-auto"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setResponse(null);
                    try {
                      const response = await axios.get(
                        `https://newsapi.org/v2/everything?q=${value}&sortBy=publishedAt&apiKey=837125b0ac2a44b788ff61164a8ab046`
                      );

                      toast.loading(`Fetching market summary for ${value}...`);
                      let combinedText = "";

                      for (let i = 0; i < response.data.articles.length; i++) {
                        const { content, description, title } =
                          response.data.articles[i];
                        const combinedLine = `${content} ${description} ${title}`;
                        const cleanedLine = combinedLine.replace(
                          /[^\w\s]/g,
                          ""
                        );
                        const cleanedLength = combinedText.replace(
                          /\s/g,
                          ""
                        ).length;
                        if (cleanedLength + cleanedLine.length > 10000) {
                          break;
                        } else {
                          combinedText += cleanedLine + " ";
                        }
                      }

                      console.log(combinedText.trim());
                      try {
                        const sentimentResponse = await axios.post(
                          `http://127.0.0.1:5000//market/${value}`,
                          {
                            text: combinedText.trim(),
                          }
                        );
                        console.log(sentimentResponse);
                        toast.dismiss();
                        setResponse(sentimentResponse.data.summary);
                        toast.success("Market summary fetched successfully!");
                      } catch (err) {
                        console.log(err);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none placeholder-gray-400"
                      placeholder="Search Stocks, Companies..."
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <div className="h-auto w-full">
                  {response === null ? (
                    <div className="flex h-20 justify-center items-center mt-4">
                      <PropagateLoader color="#ffffff" />
                    </div>
                  ) : (
                    <div className="">{response}</div>
                  )}
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowsMarket;
