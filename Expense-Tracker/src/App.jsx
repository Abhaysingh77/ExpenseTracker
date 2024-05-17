import "./App.css";

import TopExpense from "./components/TopExpense/TopExpense";
import Transaction from "./components/Transaction/Transaction";

import { useEffect, useState } from "react";
import { getExpensesData } from "./api/api";
import { deleteExpenseData } from "./api/api";

function App() {
  const [expenseData, setExpenseData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [editExpense, setEditExpense] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openEditModal = (expenseData) => {
    setEditExpense(expenseData);
    setIsModalOpen(true);
  };


  const updateTransaction = (data) => {
    setExpenseData((prev) => {
      const updatedData = [ data,...prev];
      createChartData(updatedData);
      return updatedData;
    });
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteExpenseData(id);
      setExpenseData((prev) => {
        const updatedData = prev.filter((item) => item._id !== id);
        createChartData(updatedData);
        return updatedData;
      });
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const createChartData = (data) => {
    const categories = ["Entertainment", "Travel", "Food"];
    const chartData = categories.map((category) => ({
      name: category,
      value: data.reduce((acc, item) => {
        return item.category === category ? acc + parseInt(item.price) : acc;
      }, 0),
    }));
    setChartData(chartData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getExpensesData();
        setExpenseData(apiData);
        createChartData(apiData);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Transaction data={chartData} updateTransaction={updateTransaction} />
      <TopExpense
        data={expenseData}
        cData={chartData}
        deleteTransaction={deleteTransaction}
        openEditModal={openEditModal}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editExpense={editExpense}
        updateTransaction={updateTransaction}
      />
    </>
  );
}

export default App;
