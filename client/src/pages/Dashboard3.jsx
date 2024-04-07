import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { getUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../hooks/getUserName";
import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "react-minimal-pie-chart";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Pie } from "react-chartjs-2";

async function searchStockSymbolYahoo(companyName) {
  const searchUrl = `https://query1.finance.yahoo.com/v1/finance/search?q=${companyName}&quotesCount=1`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();

    // Check if the response contains search results
    if (data.quotes && data.quotes.length > 0) {
      const firstResult = data.quotes[0];
      const symbol = firstResult.symbol;
      const name = firstResult.shortname;
      return { symbol, name };
    } else {
      throw new Error("No matching stock symbols found.");
    }
  } catch (error) {
    console.error("Error searching stock symbol:", error.message);
    return null;
  }
}

async function fetchStockPriceYahoo(companyName) {
  const { symbol } = await searchStockSymbolYahoo(companyName);
  if (!symbol) return null; // Handle case where symbol is not found

  const priceUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

  try {
    const response = await fetch(priceUrl);
    const data = await response.json();

    // Check if the response contains price data
    if (data.chart && data.chart.result && data.chart.result.length > 0) {
      const price = data.chart.result[0].meta.regularMarketPrice;
      return { symbol, price };
    } else {
      throw new Error("Failed to fetch stock price. Invalid response.");
    }
  } catch (error) {
    console.error("Error fetching stock price:", error.message);
    return null;
  }
}

// function formatNumberIndian(number) {
//   return number.toLocaleString("en-IN");
// }

let stock_price = 0;

const Dashboard3 = () => {
  const navigate = useNavigate();
  const userId = getUserID();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [email, setEmail] = useState("");
  const [spends, setSpends] = useState(null);
  const [investPieData, setInvestPieData] = useState(null);
  const [sameXAxis, setSameXAxis] = useState(null);
  const [sameYAxis, setSameYAxis] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [stockInvestments, setStockInvestments] = useState(null);
  const [stocksChartData, setStocksChartData] = useState(null);
  const [incomeTransactions, setIncomeTransactions] = useState(null);
  const [expenseTransactions, setExpenseTransactions] = useState(null);

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [incomeDataChart, setIncomeDataChart] = useState(null);
  const [expenseDataChart, setExpenseDataChart] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
  }, [userId, navigate]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
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
        setBalance(response.data.availableBalance);
        setIncome(response.data.totalIncome);
        setExpense(response.data.totalExpenses);
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
        setSpends(response.data.groupedExpenditures);
        const getRandomColor = () =>
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        setInvestPieData(
          Object.entries(response.data.categoryPercentages).map(
            ([category, percentage]) => ({
              title: category,
              value: parseFloat(percentage),
              color: getRandomColor(), // You can define this function to generate random colors or use predefined colors
            })
          )
        );
        console.log(response.data);
        setStockInvestments(response.data.stockInvestments);
        setIncomeTransactions(response.data.income);
        setExpenseTransactions(response.data.expense);
      } catch (error) {
        console.error(error);
      }
    };
    balance();

    const transactions = async () => {
      try {
        const response = await axios.get(`user/transactions/${userId}`);
        setTransactions(response.data.transactions.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };
    transactions();
  }, [userId]);
  useEffect(() => {
    if (incomeData.dates.length > 0) {
      const temp = incomeData.dates.map((timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        return hours;
      });
      setIncomeDataChart({
        xAxis: temp,
        yAxis: incomeData.amounts,
      });
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

      if (incomeData.dates.length > 0 && expenseData.dates.length > 0) {
        const minDataLength = Math.min(
          incomeData.dates.length,
          expenseData.dates.length
        );

        // Prepare data for income chart
        const sameXin = incomeData.amounts.slice(0, minDataLength);
        const sameXex = expenseData.amounts.slice(0, minDataLength);
        const itTemp = incomeData.dates
          .slice(0, minDataLength)
          .map((timestamp) => {
            const date = new Date(timestamp);
            const hours = date.getHours();
            return hours;
          });
        // Prepare data for expense chart
        setSameYAxis({
          in: sameXin,
          exp: sameXex,
        });

        setSameXAxis(itTemp);
      }
    }
  }, [incomeData, expenseData]);

  return (
    <div className="w-full flex flex-col justify-center items-center mt-6">
      <div className="row1 flex justify-between w-11/12">
        <div className="flex text-4xl flex-col">
          <h1>Available Balance</h1>
          {balance >= 0 ? (
            <h2 className="text-green-500">
              ₹{balance.toLocaleString("en-IN")}
            </h2>
          ) : (
            <h2 className="text-red-500">₹{balance.toLocaleString("en-IN")}</h2>
          )}
        </div>
        <h2 className="text-3xl">{formattedDate}</h2>
        <div className="flex gap-1">
          <div className="text-6xl">👤 </div>
          <div className="text-2xl">
            <h2 className="text-left text-violet-200">{getUserName()}</h2>
            <p className="text-left">{email}</p>
          </div>
        </div>
      </div>
      <div className="row2 w-11/12 flex gap-8 mt-4">
        <div className="flex flex-col gap-4 w-fit">
          <div className="flex gap-4">
            {incomeDataChart && (
              <div className="bg-[#ffffff] text-violet-900 text-center text-3xl p-2 rounded-2xl ">
                <p className="leading-5">
                  Income Chart <br />
                  <span className="text-lg text-green-500">
                    ₹{income.toLocaleString("en-IN")}
                  </span>
                </p>
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
                <p className="leading-5">
                  Expense Chart <br />
                  <span className="text-lg text-red-500">
                    ₹{expense.toLocaleString("en-IN")}
                  </span>
                </p>{" "}
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
          {incomeDataChart &&
            expenseDataChart &&
            incomeDataChart.xAxis.length === expenseDataChart.xAxis.length && (
              <div className="bg-[#ffffff] text-violet-900 text-center text-3xl p-2 rounded-2xl ">
                <p className="leading-5">
                  Income vs Expense <br />
                </p>
                <LineChart
                  xAxis={[
                    {
                      data:
                        incomeDataChart?.xAxis > expenseDataChart?.xAxis
                          ? expenseDataChart?.xAxis
                          : incomeDataChart?.xAxis,
                    },
                  ]}
                  series={[
                    {
                      label: "Income",
                      data: sameYAxis?.in,
                      borderColor: "#00FF00", // Green color for income
                      fill: false,
                      tension: 0.1,
                    },
                    {
                      label: "Expenditure",
                      data: sameYAxis?.exp,
                      borderColor: "rgb(255, 99, 132)",
                      fill: false,
                      tension: 0.1,
                    },
                  ]}
                  width={"600"}
                  margin={{ top: 10, right: 10, bottom: 10 }}
                  height={150}
                  grid={{}}
                  style={{ textColor: "white" }}
                />
              </div>
            )}
        </div>
        {spends && (
          <div className="flex flex-col bg-violet-600 rounded-2xl px-6 mr-6 py-1 w-fit">
            <h2 className="text-center text-3xl mb-8">Spends</h2>
            <div className="text-white text-center flex flex-col gap-4">
              {Object.entries(spends).slice(0, 5).map(([category, amount]) => (
                <div key={category}>
                  <p className="text-xl">{category}</p>
                  <p className="text-lg">₹{amount.toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {investPieData && (
          <div className="w-fit">
            <h3 className="text-center -mb-24 text-3xl">Investments</h3>
            <PieChart
              onClick={handleOpen}
              className="w-68 mt-16"
              data={investPieData}
              paddingAngle=""
              animate="true"
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h3 className="text-center text-3xl text-violet-600 mb-2">
                  Investment Categories
                </h3>
                {investPieData.map((data, index) => (
                  <div className="" key={index}>
                    <p>
                      <span className="font-bold">{data.title}</span> :{" "}
                      {data.value} %
                    </p>
                  </div>
                ))}
              </Box>
            </Modal>
          </div>
        )}
      </div>
      <div className="row3 w-11/12 mt-8 rounded-2xl pb-4 bg-violet-600">
        <h2 className="text-3xl px-5 py-3">Recent Transactions</h2>
        <div className="flex flex-col gap-2 px-4">
          {transactions &&
            transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex bg-white rounded-lg justify-between items-center p-3"
              >
                <div className="flex flex-col ">
                  <p className="text-xl text-black">
                    {transaction.description}
                  </p>
                  <p className="text-md text-violet-500 ">
                    📅{transaction.date.slice(0, 10)} - ⌚
                    {transaction.date.slice(11, 19)}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg text-right">
                    {transaction.type === "Income" ? (
                      <span className="text-green-500 text-xl">
                        ₹{transaction.amount.toLocaleString("en-IN")} (
                        {transaction.type})
                      </span>
                    ) : transaction.type === "Expense" ? (
                      <span className="text-red-500 text-xl">
                        ₹{transaction.amount.toLocaleString("en-IN")} (
                        {transaction.type})
                      </span>
                    ) : (
                      <span className="text-black text-xl">
                        ₹{transaction.amount.toLocaleString("en-IN")} (
                        {transaction.type})
                      </span>
                    )}
                  </p>
                  <p className="text-md text-right text-violet-500">
                    {transaction.category}
                  </p>
                </div>
              </div>
            ))}
        </div>{" "}
        <Link to="/transactions" className="text-white  text-lg pt-5 pl-5">
          View all transactions
        </Link>
      </div>
      <div className="row4 w-11/12 mt-2 flex gap-4">
        {stockInvestments && (
          <div className="w-1/3 mt-8 rounded-2xl bg-white pb-3 flex flex-col">
            <h2 className="text-center text-black text-3xl p-4">
              Stocks Portfolio
            </h2>
            <div className="px-4 flex flex-col gap-1">
              {stockInvestments.map((stock) => (
                <div
                  key={stock._id}
                  className="flex bg-blue-600  rounded-2xl justify-between items-center px-3 py-1"
                >
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-white">
                      {stock.ƒ}
                    </p>
                    <p className="text-md text-white">
                      {stock.date.slice(0, 10)} - {stock.date.slice(11, 16)}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-right text-white">
                      ₹{stock.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}{" "}
        <div className="w-1/3 mt-8 rounded-2xl bg-white pb-3 flex flex-col">
          <h2 className="text-center text-black text-3xl p-4">
            Recent Expenses
          </h2>
          <div className="px-4 flex flex-col gap-1">
            {expenseTransactions &&
              expenseTransactions.slice(0, 5).map((expense) => (
                <div
                  key={expense._id}
                  className="flex bg-red-600  rounded-2xl justify-between items-center px-3 py-1"
                >
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-white">
                      {expense.receiver}
                    </p>
                    <p className="text-md text-white">
                      {expense.date.slice(0, 10)} - {expense.date.slice(11, 16)}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg text-right text-white">
                      ₹{expense.amount}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-1/3 mt-8 rounded-2xl bg-white pb-3 flex flex-col">
          <h2 className="text-center text-black text-3xl p-4">Recent Income</h2>
          <div className="px-4 flex flex-col gap-1">
            {incomeTransactions &&
              incomeTransactions.slice(0, 5).map((income) => (
                <div
                  key={income._id}
                  className="flex bg-green-600  rounded-2xl justify-between items-center px-3 py-1"
                >
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-white">
                      {income.sender}
                    </p>
                    <p className="text-md text-white">
                      {income.date.slice(0, 10)} - {income.date.slice(11, 16)}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg text-right font-bold text-white">
                      ₹{income.amount}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard3;
