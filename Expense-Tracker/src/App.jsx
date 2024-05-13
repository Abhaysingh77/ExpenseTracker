import "./App.css";
import Transaction from "./components/Transaction/Transaction.jsx";
import TopExpense from "./components/TopExpense/TopExpense.jsx";
import { useEffect, useState } from "react";
import { getExpensesData } from "./api/api.js";

function App() {
  const [expenseData, setExpenseData] = useState([]);
  const [chartData, setChartData] = useState([
    { name: "Food", value: 0 },
    { name: "Travel", value: 0 },
    { name: "Entertainment", value: 0 },
  ]);

  const getChartData = () => {
    const updatedChartData = [...chartData]; // Create a copy of chartData
    updatedChartData.forEach((item) => {
      item.value = 0;
      expenseData.forEach((data) => {
        if (item.name === data.category) {
          item.value += Number(data.price);
        }
      });
    });
    setChartData(updatedChartData); // Update chartData state
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpensesData();
        setExpenseData(data);
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getChartData();
  }, [expenseData]);

  return (
    <main className="main">
      <Transaction data={chartData} />
      <TopExpense data={expenseData} chartData={chartData} />
    </main>
  );
}

export default App;
