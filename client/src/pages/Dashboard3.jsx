import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { getUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../hooks/getUserName";
import { useState } from "react";
const Dashboard3 = () => {
  const navigate = useNavigate();
  const userId = getUserID();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
  }, [userId, navigate]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0, so we add 1
  const day = String(today.getDate()).padStart(2, "0");
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[today.getDay()];
  
  const formattedDate = `${year}-${month}-${day} (${dayOfWeek})`;
  
  useEffect(() => {
    const balance = async () => {
      try {
        const response = await axios.get(`user/dashboard/fetchInfo/${userId}`);
        console.log(response.data);
        setBalance(response.data.availableBalance);
        setIncome(response.data.totalIncome);
        setExpense(response.data.totalExpense);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    balance();
  }, [userId]);
  return (
    <div className="w-full flex flex-col justify-center items-center mt-6">
      <div className="flex justify-between w-11/12">
        <div className="flex text-4xl flex-col">
          <h1>Available Balance</h1>
          {balance >= 0 ? (
            <h2 className="text-green-500">₹{balance}</h2>
          ) : (
            <h2 className="text-red-500">₹{balance}</h2>
          )}
        </div>
        <h2 className="text-3xl">{formattedDate}</h2>
        <div className="flex">
          <div className="text-6xl">👤</div>
          <div className="text-2xl">
            <h2 className="text-left text-violet-200">{getUserName()}</h2>
            <p className="text-left">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard3;
