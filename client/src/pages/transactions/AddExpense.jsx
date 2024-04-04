import React, { useState } from "react";

const AddExpense = () => {
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

  const handleClassify = async () => {
    // Implement API call to classify image and get category
    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        body: picture,
      });
      const data = await response.json();
      setCategory(data.category); // Assuming the response contains category
    } catch (error) {
      console.error("Error classifying image:", error);
      // Handle error
    }
  };

  const handleSubmit = async () => {
    // Implement logic to submit expense data
    const expenseData = {
      picture,
      category,
      receiver,
      amount,
      description,
    };
    try {
      const response = await fetch("/api/expense", {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle response
    } catch (error) {
      console.error("Error submitting expense:", error);
      // Handle error
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Expense
          </h2>
        </div>
        <div className="mt-8 ">
          <label
            htmlFor="pictureInput"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Picture:
          </label>
          <input
            id="pictureInput"
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {preview && (
            <div className="mt-4">
              <h3 className="text-sm font-medium leading-5 text-gray-900">
                Preview:
              </h3>
              <img src={preview} alt="Preview" className="mt-2 w-full h-auto" />
              <button
                onClick={handleClassify}
                className="mt-4 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                Classify
              </button>
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="receiverInput"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Receiver:
            </label>
            <input
              id="receiverInput"
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="amountInput"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount:
            </label>
            <input
              id="amountInput"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="categoryInput"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category:
            </label>
            <input
              id="categoryInput"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="descriptionInput"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description:
            </label>
            <textarea
              id="descriptionInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
