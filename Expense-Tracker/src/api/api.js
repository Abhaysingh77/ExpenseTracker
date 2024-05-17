import axios from "axios";
const CONFIG = "https://expensetracker-bdsd.onrender.com";

export const getExpensesData = async () => {
  try {
    const res = await axios.get(`${CONFIG}/expenses`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch expenses data.");
  }
};

export const postExpenseData = async (body) => {
  try {
    const res = await axios.post(`${CONFIG}/expense`, body);
    return res.data;
  } catch (err) {
    console.error("Failed to add expense", err);
    throw new Error("Failed to add expense.");
  }
};

export const updateExpenseData = async (body, _id) => {
  try {
    const res = await axios.put(`${CONFIG}/expenses/${_id}`, body);
    return res.data;
  } catch (err) {
    console.error("Failed to update expense", err);
    throw new Error("Failed to update expense.");
  }
};

export const deleteExpenseData = async (id) => {
  try {
    const res = await axios.delete(`${CONFIG}/expenses/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete expense", err);
    throw new Error("Failed to delete expense.");
  }
};
