import { useState } from "react";
import { useDispatch } from "react-redux";

import Card from "./UI/Card";
import "./NewExpense.css";
import { AddExpence } from "../../store/expences-slice";
import { ExpencesAction } from "../../store/expences-slice";

function NewExpense(props) {
  const [title, setTitle] = new useState("");
  const [amount, setAmount] = new useState("");
  const [date, setDate] = new useState("");
  const [category, setCategory] = new useState("other");
  const [bill, setBill] = new useState(null);
  const dispatch = useDispatch();

  const titleHandler = (event) => {
    let value = event.type === "submit" ? "" : event.target.value;
    setTitle(value);
  };

  const amountHandler = (event) => {
    let value = event.type === "submit" ? "" : event.target.value;
    setAmount(value);
  };

  const dateHandler = (event) => {
    let value = event.type === "submit" ? "" : event.target.value;
    setDate(value);
  };

  const categoryHandler = (event) => {
    let value = event.type === "submit" ? "other" : event.target.value;
    setCategory(value);
  };

  const uploadFile = (event) => {
    if (event.type === "submit") {
      event.target.value = "";
      return;
    }
    setBill(event.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      AddExpence({
        title: title,
        amount: amount,
        date: date,
        category: category,
        bill: bill,
      })
    );
    dispatch(
      ExpencesAction.filter({
        year: new Date(date).getFullYear().toString(),
        category: category,
      })
    );
    titleHandler(event);
    amountHandler(event);
    dateHandler(event);
    categoryHandler(event);
    uploadFile(event);
  };

  return (
    <Card className="new-expense">
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input type="text" value={title} onChange={titleHandler} required />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              value={amount}
              step="0.01"
              onChange={amountHandler}
              required
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2019-01-01"
              value={date}
              max="2022-12-31"
              onChange={dateHandler}
              required
            />
          </div>
          <div className="new-expense__control">
            <label>Filter by Catagory</label>
            <select onChange={categoryHandler}>
              {/* <option value='select_category'>Select Category</option> */}
              <option value="other">Other</option>
              <option value="fuel">Fuel</option>
              <option value="personal">Personal</option>
              <option value="food">Food</option>
            </select>
          </div>
          <div className="new-expense__control">
            <label>Upload Bill</label>
            <input type="file" onChange={uploadFile} />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </Card>
  );
}

export default NewExpense;
