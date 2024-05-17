import "./ExpenseCard.css";
import { CiPizza } from "react-icons/ci";
import {
  MdOutlineEdit,
  MdCardTravel,
  MdOutlineMovieFilter,
} from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import PropTypes from "prop-types";
import ModalBox from "../Modal/Modal";

export default function ExpenseCard({
  category,
  price,
  date,
  title,
  _id,
  deleteTransaction,
  openEditModal,
  isModalOpen,
  setIsModalOpen,
  editExpense,
  updateTransaction,
}) {
  const handleEdit = () => {
    openEditModal({
      category,
      price,
      date,
      title,
      _id,
    });
  };
  return (
    <div className="TransCard" key={_id}>
      <div className="left">
        <div className="logo">
          {category === "Food" && (
            <CiPizza
              fill="black"
              style={{
                height: "30px",
                width: "30px",
                transform: "rotate(-40deg)",
              }}
            />
          )}
          {category === "Travel" && (
            <MdCardTravel
              fill="black"
              style={{ height: "30px", width: "30px" }}
            />
          )}
          {category === "Entertainment" && (
            <MdOutlineMovieFilter
              fill="black"
              style={{ height: "30px", width: "30px" }}
            />
          )}
        </div>
        <div className="text">
          <p>{title}</p>
          <p className="sml">{date}</p>
        </div>
      </div>
      <div className="right">
        <div className="price">
          <span
            
            style={{ color: "#F4BB4A", fontWeight: "bold", fontSize: "larger" }}
          >
            &#8377;{price}
          </span>
        </div>
        <div>
          <span className="delete">
            <TiDeleteOutline
              fill="white"
              style={{ height: "37px", width: "36px" }}
              onClick={() => deleteTransaction(_id)}
            />
          </span>
          <span className="edit">
            <MdOutlineEdit
              fill="white"
              style={{ height: "35px", width: "30px", margin: "auto" }}
              onClick={handleEdit}
            />
          </span>
        </div>
      </div>
      <ModalBox
        btnText="Edit expense"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        editExpense={editExpense}
        updateTransaction={updateTransaction}
      />
    </div>
  );
}

ExpenseCard.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  editExpense: PropTypes.object.isRequired,
};
