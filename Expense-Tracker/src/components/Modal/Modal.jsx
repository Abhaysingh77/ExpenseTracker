import ReactModal from "react-modal";
import "./Modal.css";
import PropTypes from "prop-types";
import { postExpenseData, updateExpenseData } from "../../api/api";
export default function ModalBox({
  btnText,
  isOpen,
  setIsOpen,
  updateTotalBalance,
  updateTransaction,
  editExpense
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());
    if (obj.date) {
      const date = new Date(obj.date);
      obj.date = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    try {
      if (editExpense && btnText==="Edit expenses") {
        const updatedData = await updateExpenseData(obj,editExpense._id);
        updateTransaction(updatedData);
      } else {
        const data = await postExpenseData(obj);
        updateTransaction(data);
      }
    } catch (error) {
      console.error("Failed to add expense", error);
    }
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleIncome = (e) => {
    localStorage.setItem("income", parseInt(e.target[0].value));
    updateTotalBalance(parseInt(e.target[0].value));
    closeModal();
  };
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
          width: "30vw",
          height: "max-content",
          margin: "auto",
          border: "1px solid #ccc",
          background: "#EFEFEFD9",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "10px",
          outline: "none",
          padding: "20px",
        },
      }}
    >
      {btnText === "Income" ? (
        <form onSubmit={handleIncome}>
          <h2 className="h2">Add Balance</h2>
          <div style={{ display: "flex" }}>
            <input
              type="number"
              name="income"
              id="income"
              className="input"
              placeholder="Income Amount"
              required
            />
            <input
              type="submit"
              value="Add Balance"
              id="addBtn"
              className="input"
            />
            <input
              type="button"
              value="Cancel"
              id="cancelBtn"
              className="input"
              onClick={handleCancel}
            />
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="h2">
            {btnText === "Expenses" ? "Add Expenses" : btnText}
          </h2>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="input"
              required
            />
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              className="input"
              required
            />
          </div>
          <div>
            <select name="category" id="cat" className="input" required>
              <option value="#">Category</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
            </select>
            <input
              type="date"
              name="date"
              id="date"
              className="input"
              required
            />
          </div>
          <div>
            {btnText === "Expenses" ? (
              <input
                type="submit"
                value="Add Expenses"
                className="input"
                id="addBtn"
              />
            ) : (
              <input
                type="submit"
                value="Edit Expenses"
                className="input"
                id="addBtn"
              />
            )}
            <input
              type="button"
              value="Cancel"
              className="input"
              id="cancelBtn"
              onClick={handleCancel}
            />
          </div>
        </form>
      )}
    </ReactModal>
  );
}

ModalBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  updateTotalBalance: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  editExpense:PropTypes.object.isRequired,
};
