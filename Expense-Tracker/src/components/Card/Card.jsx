import PropTypes from "prop-types";
import "./Card.css";
import ModalBox from "../Modal/Modal";

export default function Card({
  editExpense,
  btnText,
  cardText,
  balance,
  isOpen,
  setIsOpen,
  updateTotalBalance,
  updateTransaction,
}) {
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="card">
      <div className="cardText">
        {cardText}: <span id="balance">&#8377;{balance}</span>
      </div>
      <button className="button" onClick={handleClick}>
        + Add {btnText}
      </button>
      <ModalBox
        isOpen={isOpen}
        btnText={btnText}
        setIsOpen={setIsOpen}
        updateTotalBalance={updateTotalBalance}
        updateTransaction={updateTransaction}
        editExpense={editExpense}
      />
    </div>
  );
}

Card.propTypes = {
  editExpense: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  cardText: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  updateTotalBalance: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
};
