import "./TopExpense.css";
import PropTypes from "prop-types";
import ExpenseChart from "../ExpenseChart/ExpenseChart";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useState } from "react";

export default function TopExpense({ data, chartData }) {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="headings">
        <div>
          <h2>Recent Transaction</h2>
        </div>
        <div>
          <h2>Top Expenses</h2>
        </div>
      </div>
      <div className="container">
        <div className="transaction">
          <div className="transCards">
            {data.slice(index,index+3).map((item) => {
              return <ExpenseCard
                category={item.category}
                title={item.title}
                date={item.date}
                price={item.price}
                key={item._id}
                _id={item._id}
              />;
            })}
          </div>
          <div className="navigationKeys">
            <span className="leftArr">
              <IoIosArrowRoundBack
                fill="black"
                style={{
                  height: "40px",
                  width: "36px",
                }}
                onClick={()=>{
                  if(index>0){
                    setIndex(prev=>prev-1);
                  }
                }}
              />
            </span>
            <span className="pageNo">{index+1}</span>
            <span className="rightArr">
              <IoIosArrowRoundForward
                fill="black"
                style={{
                  height: "40px",
                  width: "36px",
                }}
                onClick={()=>{
                  if(index<data.length){
                    setIndex(prev=>prev+1);
                  }
                }}
              />
            </span>
          </div>
        </div>
        <div className="graph">
          <ExpenseChart data={chartData} />
        </div>
      </div>
    </>
  );
}

TopExpense.propTypes = {
  data: PropTypes.array.isRequired,
  chartData: PropTypes.array.isRequired,
};
