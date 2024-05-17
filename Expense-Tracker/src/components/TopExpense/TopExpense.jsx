import "./TopExpense.css";
import PropTypes from "prop-types";
import ExpenseChart from "../ExpenseChart/ExpenseChart";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useState } from "react";

export default function TopExpense({
  data = [],
  cData = [],
  deleteTransaction,
  openEditModal,
  isModalOpen,
  setIsModalOpen,
  editExpense,
  updateTransaction,
}) {
  const [index, setIndex] = useState(0);
  const [pageNo, setPageNo] = useState(0);
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
            {data.slice(index, index + 3).map((item) => {
              return (
                <ExpenseCard
                  category={item.category}
                  price={item.price}
                  date={item.date}
                  title={item.title}
                  _id={item._id}
                  key={item._id}
                  deleteTransaction={deleteTransaction}
                  openEditModal={openEditModal}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  editExpense={editExpense}
                  updateTransaction={updateTransaction}
                />
              );
            })}
          </div>
          <div className="navigationKeys">
            <span className="leftArr">
              <IoIosArrowRoundBack
                fill="black"
                style={{ height: "40px", width: "36px" }}
                onClick={() => {
                  if (index > 2) {
                    setPageNo((prev) => prev - 1);
                    setIndex((prev) => prev - 3);
                  }
                }}
              />
            </span>
            <span className="pageNo">{pageNo + 1}</span>
            <span className="rightArr">
              <IoIosArrowRoundForward
                fill="black"
                style={{ height: "40px", width: "36px" }}
                onClick={() => {
                  if (index + 3 < data.length) {
                    setPageNo((prev) => prev + 1);
                    setIndex((prev) => prev + 3);
                  }
                }}
              />
            </span>
          </div>
        </div>
        <div className="graph">
          <ExpenseChart chartData={cData} />
        </div>
      </div>
    </>
  );
}

TopExpense.propTypes = {
  data: PropTypes.array.isRequired,
  cData: PropTypes.array.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  setEditExpense: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  isModalOpen:PropTypes.bool.isRequired,
  editExpense:PropTypes.object.isRequired,
  updateTransaction:PropTypes.func.isRequired,
};
