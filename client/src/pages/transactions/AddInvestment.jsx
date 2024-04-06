import React, { useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import { getUserID } from "../../hooks/getUserID";
const AddInvestment = () => {
  const userID = getUserID();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [investedWhere, setInvestedWhere] = useState("");
  const [reminderPeriod, setReminderPeriod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/addInvestment", {
        userID,
        category,
        amount,
        description,
        investedWhere,
        reminderPeriod,
      });
      toast.success("Investment added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      toast.error("Error registering investment!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-full flex-1 items-center flex-col justify-center px-6 py-4 lg:px-8">
      <div className="items-center w-full flex-col justify-center">
        <h1 className="mb- text-center text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl ">
          Add Investment
        </h1>
        <p className="mb-6 text-center text-lg font-normal text-purple-200 lg:text-xl sm:px-16 xl:px-48 ">
          Add the investment details below
        </p>
      </div>
      <div className="w-full bg-[#ffffff] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor="fromBank"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Investment Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#050620] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              >
                <option value="">Select Category</option>
                <option value="Stocks">Stocks</option>
                <option value="Crypto">Crypto</option>
                <option value="Bonds">Bonds</option>
                <option value="Mutual Funds">Mutual Funds</option>
                <option value="ETFs">ETFs</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Commodities">Commodities</option>
                <option value="Savings">Savings</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="investedWhere"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Invested Where?
              </label>
              <input
                type="text"
                name="investedWhere"
                id="investedWhere"
                value={investedWhere}
                onChange={(e) => setInvestedWhere(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#050620] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Tesla Inc."
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Amount
              </label>
              <input
                type="text"
                name="amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="300"
                className="bg-gray-50 border border-gray-300 text-[#050620] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Recieved from client"
                className="bg-gray-50 border border-gray-300 text-[#050620] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="reminderPeriod"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Reminder Period
              </label>
              <input
                type="text"
                name="reminderPeriod"
                id="reminderPeriod"
                value={reminderPeriod}
                onChange={(e) => setReminderPeriod(e.target.value)}
                placeholder="10"
                className="bg-gray-50 border border-gray-300 text-[#050620] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#02031C] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Investment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInvestment;
