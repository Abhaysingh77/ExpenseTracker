import Card from "../Card/Card.jsx";
import Chart from "../PieChart/Chart.jsx";
import PropTypes from "prop-types";
import "./Transaction.css";
import { useEffect, useState } from "react";
export default function Transaction({ data = [] }) {
  const [balance, setBalance] = useState(0);
  let expenses=0;
  data.forEach((item) => (expenses += item.value));
  useEffect(() => {
    const income = localStorage.getItem("income");
    setBalance(income ? parseInt(income) : 0);
  }, []);
  return (
    <>
      <h2>Expense Tracker</h2>
      <section className="tracker">
        <div className="cards">
          <Card btnText="Income" cardText="Wallet Balance" balance={balance} />
          <Card btnText="Expenses" cardText="Expenses" balance={expenses} />
        </div>
        <Chart data={data} />
      </section>
    </>
  );
}

Transaction.propTypes = {
  data: PropTypes.array.isRequired,
};
