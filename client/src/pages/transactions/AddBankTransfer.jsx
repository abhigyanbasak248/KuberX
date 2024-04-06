import React, { useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import { getUserID } from "../../hooks/getUserID";
const AddBankTransfer = () => {
  const userID = getUserID();
  const [fromBankAcc, setFromBank] = useState("");
  const [toBankAcc, setToBank] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/addBankTransfer", {
        userID,
        fromBankAcc,
        toBankAcc,
        amount,
        description,
      });
      toast.success("Bank Transfer Transaction added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      toast.error("Error registering transaction!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-full flex-1 items-center flex-col justify-center px-6 py-4 lg:px-8">
      <div className="items-center w-full flex-col justify-center">
        <h1 className="mb- text-center text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl ">
          Add Bank Transfer Transaction
        </h1>
        <p className="mb-6 text-center text-lg font-normal text-purple-200 lg:text-xl sm:px-16 xl:px-48 ">
          Add the bank transfer transaction details below
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
                Source Bank
              </label>
              <input
                type="text"
                name="fromBank"
                id="fromBank"
                value={fromBankAcc}
                onChange={(e) => setFromBank(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#050620] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Axis Bank"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="toBank"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Destination Bank
              </label>
              <input
                type="text"
                name="toBank"
                id="toBank"
                value={toBankAcc}
                onChange={(e) => setToBank(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#050620] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ICICI Bank"
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
                placeholder="9500"
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
            <button
              type="submit"
              className="w-full text-white bg-[#02031C] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Bank Transfer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBankTransfer;
