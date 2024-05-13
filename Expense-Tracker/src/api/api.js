import axios from "axios";
const CONFIG = "https://expensetracker-bdsd.onrender.com";
export const getExpensesData = async () => {
  try {
    const res = await axios.get(`${CONFIG}/expenses`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const postExpenseData = async (body) => {
  try {
    const res = await axios.post(`${CONFIG}/expense`,body);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateExpenseData = async (body,_id) =>{
  try {
    const res = await axios.put(`${CONFIG}/expenses/${_id}`,body);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const deleteExpenseData = async(id) =>{
  try {
    const res = await axios.delete(`${CONFIG}/expenses/${id}`);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
