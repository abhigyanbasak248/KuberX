import React, { useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import { getUserID } from "../../hooks/getUserID";
const AddIncome = () => {
  const userID = getUserID();
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClassify = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", picture);
    try {
      const response = await axios.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.category) {
        setCategory(response.data.category);
      }
      if (response.data.receiver) {
        setReceiver(response.data.receiver);
      }
      if (response.data.amount) {
        setAmount(response.data.amount);
      }
      if (response.data.description) {
        setDescription(response.data.description);
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/addExpense", {
        receiver,
        amount,
        category,
        description,
        userID: userID,
      });
      toast.success("Expense added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      toast.error("Error adding expense!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
      <div className="items-center  w-full flex-col justify-center">
        <h1 className="mb- text-center text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl ">
          Add Income
        </h1>
        <p className="mb-6 text-center text-lg font-normal text-purple-200 lg:text-xl sm:px-16 xl:px-48 ">
          Add the income details below
        </p>
      </div>
      <div className="bg-white w-[55%] mx-auto rounded-xl flex items-center justify-between px-8 ">
        <form className="mt-4 space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label
              htmlFor="receiverInput"
              className="block text-left text-base font-semibold leading-6 text-gray-900"
            >
              Receiver
            </label>
            <input
              id="receiverInput"
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="text-violet-950 mt-1 block w-full rounded-md border px-6 border-black shadow-sm "
            />
          </div>
          <div>
            <label
              htmlFor="amountInput"
              className="block text-left text-base font-semibold leading-6 text-gray-900"
            >
              Amount
            </label>
            <input
              id="amountInput"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-violet-950 mt-1 block w-full rounded-md border px-6 border-black shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="categoryInput"
              className="block text-left text-base font-semibold leading-6 text-gray-900"
            >
              Category
            </label>
            <input
              id="categoryInput"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-violet-950 mt-1 block w-full rounded-md border px-6 border-black shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="descriptionInput"
              className="block text-left text-base font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <textarea
              id="descriptionInput"
              rows={1}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-violet-950 mt-1 block w-full rounded-md border px-6 border-black shadow-sm"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md border border-transparent px-4 py-1 bg-purple-800 text-base leading-6 font-medium text-white shadow-sm hover:bg-purple-900 focus:outline-none transition ease-in-out duration-150"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
