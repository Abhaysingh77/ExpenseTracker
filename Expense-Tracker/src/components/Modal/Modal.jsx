import ReactModal from "react-modal";
import "./Modal.css";
import PropTypes from "prop-types";
import { postExpenseData, updateExpenseData } from "../../api/api";
export default function ModalBox({ isOpen, setIsOpen, btnText, body, _id  }) {
  const handleIncome = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "income",
      Number(e.target[0].value) + Number(localStorage.getItem("income"))
    );
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {};
    for (let i = 0; i < 4; i++) {
      if (e.target[i].name === "date") {
        let date = new Date(e.target[i].value);
        let formattedDate = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        obj[e.target[i].name] = formattedDate;
      } else {
        obj[e.target[i].name] = e.target[i].value;
      }
    }
    if (btnText === "Income") {
      // Add balance logic here...
    } else {
      postExpenseData(obj);
    }
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  
  const closeModal = () => {
    setIsOpen(false);
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
           {btnText==="Expenses" ? ( <input
              type="submit"
              value="Add Expenses"
              className="input"
              id="addBtn"
            />):( <input
              type="button"
              value="Edit Expenses"
              className="input"
              id="addBtn"
              onClick={async()=>{
                updateExpenseData(body,_id);
              }}
            />)}
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
  body: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
};
