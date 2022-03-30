import {useState} from 'react';
import { useDispatch } from 'react-redux';


import Card from "./UI/Card";
import './NewExpense.css';
import {AddExpence} from '../../store/expences-slice'
import { ExpencesAction } from '../../store/expences-slice'

function NewExpense(props) {
    const [title, setTitle] = new useState('');
    const [amount, setAmount] = new useState('');
    const [date, setDate] = new useState('');
    const dispatch = useDispatch();

    const titleHandler = (event) => {
        let value = event.type === "submit" ? "" : event.target.value; 
        setTitle(value);
    }

    const amountHandler = (event) => {
        let value = event.type === "submit" ? "" : event.target.value; 
        setAmount(value);
    }

    const dateHandler = (event) => {
        let value = event.type === "submit" ? "" : event.target.value; 
        setDate(value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        titleHandler(event);
        amountHandler(event);
        dateHandler(event);
        dispatch(AddExpence({title:title, amount:amount, date:date}));
        dispatch(ExpencesAction.filter(new Date(date).getFullYear().toString()))
    }

    return <Card className='new-expense'>
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type='text' value={title} onChange={titleHandler} required/>
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input type='number' min='0.01' value={amount} step='0.01' onChange={amountHandler} required/>
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input type='date' min='2019-01-01' value={date} max='2022-12-31' onChange={dateHandler} required/>
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='submit'>Add Expense</button>
            </div>
        </form>
    </Card>
}

export default NewExpense;