import express from "express";
import cors from "cors";
import { expense } from "./db.js";
import { nanoid } from "nanoid";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/expenses", (req, res) => {
  expense.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json(docs);
  });
});

app.post("/expense", (req, res) => {
  const { category, title, date, price } = req.body;
  const _id = nanoid()
  expense.insert({_id, category, title, date, price }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(201).json(doc);
  });
});
app.listen(8080, () => {
  console.log("backend is running");
});

app.put('/expenses/:id', (req, res) => {
  const id = req.params.id;
  const { category, title, date, price } = req.body;
  expense.update({ _id: id }, { $set: { category, title, date, price  } }, {}, (err, numReplaced) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      if (numReplaced === 0) {
          return res.status(404).json({ error: 'Expense not found' });
      }
      return res.status(200).json({ message: 'Expense updated successfully' });
  });
});

app.delete('/expenses/:id', (req, res) => {
  const id = req.params.id;
  expense.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      if (numRemoved === 0) {
          return res.status(404).json({ error: 'Expense not found' });
      }
      return res.status(204).json({success:"Deleted successfully"}); // No content to send
  });
});