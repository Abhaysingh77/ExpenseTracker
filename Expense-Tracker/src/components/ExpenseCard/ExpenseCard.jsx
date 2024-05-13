import "./ExpenseCard.css";
import { CiPizza } from "react-icons/ci";
import {
  MdOutlineEdit,
  MdCardTravel,
  MdOutlineMovieFilter,
} from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteExpenseData } from "../../api/api";
import ModalBox from "../Modal/Modal";
import { useState } from "react";
import PropTypes from "prop-types";
export default function ExpenseCard({ category, title, date, price, _id }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  const body = {
    _id: _id,
    category: category,
    title: title,
    date: date,
    price: price,
  };
  return (
    <div className="TransCard">
      <ModalBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        btnText="Edit Expenses"
        body={body}
        _id={_id}
      />
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
              style={{
                height: "30px",
                width: "30px",
              }}
            />
          )}
          {category === "Entertainment" && (
            <MdOutlineMovieFilter
              fill="black"
              style={{
                height: "30px",
                width: "30px",
              }}
            />
          )}
        </div>
        <div className="text">
          <p>{title}</p>
          <p className="sml">{date}</p>
        </div>
      </div>
      <div className="right">
        <div>
          <span
            className="price"
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
              onClick={() => {
                deleteExpenseData(_id);
              }}
            />
          </span>
          <span className="edit">
            <MdOutlineEdit
              fill="white"
              style={{ height: "35px", width: "30px", margin: "auto" }}
              onClick={handleClick}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

ExpenseCard.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};
