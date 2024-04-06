import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { getUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../hooks/getUserName";
import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const Dashboard3 = () => {
  const navigate = useNavigate();
  const userId = getUserID();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [email, setEmail] = useState("");
  const [incomeData, setIncomeData] = useState({
    dates: [],
    amounts: [],
    sender: [],
  });
  const [expenseData, setExpenseData] = useState({
    dates: [],
    amounts: [],
    receiver: [],
    category: [],
  });

  const [incomeDataChart, setIncomeDataChart] = useState(null);
  const [expenseDataChart, setExpenseDataChart] = useState(null);

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

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
        setIncomeData({
          dates: response.data.income.map((entry) => entry.date),
          amounts: response.data.income.map((entry) => entry.amount),
          sender: response.data.income.map((entry) => entry.sender),
        });
        setExpenseData({
          dates: response.data.expense.map((entry) => entry.date),
          amounts: response.data.expense.map((entry) => entry.amount),
          receiver: response.data.expense.map((entry) => entry.receiver),
          category: response.data.expense.map((entry) => entry.category),
        });
      } catch (error) {
        console.error(error);
      }
    };
    balance();
  }, [userId]);
  useEffect(() => {
    if (incomeData.dates.length > 0) {
      console.log("hi");
      console.log(incomeData.dates, incomeData.amounts, incomeData.sender);
      const temp = incomeData.dates.map((timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        return hours;
      });
      setIncomeDataChart({
        xAxis: temp,
        yAxis: incomeData.amounts,
      });
      console.log(incomeDataChart);
    }

    if (expenseData.dates.length > 0) {
      const temp = expenseData.dates.map((timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        return hours;
      });
      setExpenseDataChart({
        xAxis: temp,
        yAxis: expenseData.amounts,
      });
      console.log(expenseDataChart);
    }
  }, [incomeData, expenseData]);

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
      <div className="w-11/12 flex gap-2 mt-4">
        {incomeDataChart && (
          <div className="bg-[#ffffff] text-violet-900 text-center text-3xl p-2 rounded-2xl ">
            Income Chart
            <LineChart
              xAxis={[{ data: incomeDataChart?.xAxis }]}
              series={[
                {
                  data: incomeDataChart?.yAxis,
                },
              ]}
              width={"300"}
              margin={{ top: 10, right: 10, bottom: 10 }}
              height={150}
              grid={{}}
              style={{ textColor: "white" }}
            />
          </div>
        )}
        {expenseDataChart && (
          <div className="bg-[#ffffff] text-violet-900 text-center text-3xl p-2 rounded-2xl ">
            Expense Chart
            <LineChart
              xAxis={[{ data: expenseDataChart?.xAxis }]}
              series={[
                {
                  data: expenseDataChart?.yAxis,
                },
              ]}
              width={"300"}
              margin={{ top: 10, right: 10, bottom: 10 }}
              height={150}
              grid={{}}
              style={{ textColor: "white" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard3;
