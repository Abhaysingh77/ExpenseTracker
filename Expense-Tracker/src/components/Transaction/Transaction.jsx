import Card from "../Card/Card.jsx";
import Chart from "../PieChart/Chart.jsx";
import PropTypes from "prop-types";
import "./Transaction.css";
import { useEffect, useState } from "react";
export default function Transaction({ data=[], updateTransaction }) {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const getTotalExpense = () =>{
    let total_expense = 0;
    data.forEach(item=>total_expense+=item.value);
    localStorage.setItem('expenses',total_expense);
    setTotalExpense(total_expense);
  }

  const updateTotalBalance = (balance) =>{
    localStorage.setItem('income',balance);
    setTotalBalance(balance);
  }
  useEffect(()=>{
    let bal = localStorage.getItem('income');
    setTotalBalance(bal);
    getTotalExpense();
  },[data])
  return (
    <>
      <h2>Expense Tracker</h2>
      <section className="tracker">
        <div className="cards">
          <Card btnText="Income" cardText="Wallet Balance" balance={parseInt(totalBalance)} isOpen={isIncomeModalOpen} setIsOpen={setIsIncomeModalOpen} updateTransaction={updateTransaction} updateTotalBalance={updateTotalBalance}/>
          <Card btnText="Expenses" cardText="Expenses" balance={totalExpense} isOpen={isExpenseModalOpen} setIsOpen={setIsExpenseModalOpen} updateTransaction={updateTransaction} updateTotalBalance={updateTotalBalance}/>
        </div>
        <Chart pieChartData={data} />
      </section>
    </>
  );
}

Transaction.propTypes = {
  data: PropTypes.array.isRequired,
  updateTransaction: PropTypes.func.isRequired,
};
