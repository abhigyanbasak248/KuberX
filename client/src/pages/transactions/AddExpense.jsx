import React, { useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import { getUserID } from "../../hooks/getUserID";
const AddExpense = () => {
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
    toast.loading("Fetching data...", {
      position: "bottom-right",
    });
    const formData = new FormData();
    formData.append("image", picture);
    try {
      const response = await axios.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.dismiss();
      if (response.data.category) {
        setCategory(response.data.category);
        toast.success(`Identified as ${response.data.category}`);
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
          Add Expense
        </h1>
        <p className="mb-6 text-center text-lg font-normal text-purple-200 lg:text-xl sm:px-16 xl:px-48 ">
          Upload a picture of the item and our AI model will categorize it.
        </p>
      </div>
      <div className="bg-white w-[55%] mx-auto rounded-xl flex items-center justify-between px-8 ">
        <div className="mt-2  flex flex-col justify-center">
          <form
            encType="multipart/form-data"
            onSubmit={(e) => handleClassify(e)}
          >
            <label
              htmlFor="pictureInput"
              className="mt-2 text-base bg-[#02031C] px-8 text-white block rounded-md border border-black w-fit shadow-sm cursor-pointer"
            >
              🖼️Upload Picture
              <input
                id="pictureInput"
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="sr-only"
              />
            </label>

            {true && (
              <div className="mt-2">
                <div className="h-80 w-80 items-center overflow-hidden flex justify-center">
                  <img
                    src={
                      preview
                        ? preview
                        : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                    }
                    alt="Preview"
                    className="mt-2 h-fit w-fit object-cover"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex text-xl mb-5 mt-4 justify-center w-80 rounded-md border border-transparent px-4 py-1 bg-purple-900 leading-6 font-medium text-white shadow-sm hover:bg-purple-950 focus:outline-none focus:border-purple-950 focus:shadow-outline-indigo active:bg-purple-950 transition ease-in-out duration-150"
                >
                  Smart-fill
                </button>
              </div>
            )}
          </form>
        </div>
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

export default AddExpense;
