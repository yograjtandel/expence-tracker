// import { useState } from 'react';
import {useSelector} from 'react-redux'

import './Expence.css'
import Card from './UI/Card';
import ExpenceItem from './ExpenceItem';
import ExpenceFilter from './ExpenceFilter';



function Expence(props) {
    const Expences = useSelector( state => state.expences.expences)
    const filterYear = useSelector( state => state.expences.filterYear)
    const filtercategory = useSelector( state => state.expences.filtercategory)
    let filteredExpense;
    if (filtercategory === "all") {
         filteredExpense = Expences.filter((expense) => new Date(expense.date).toLocaleString('default', { year: 'numeric' }) === filterYear);
    } else {
        filteredExpense = Expences.filter((expense) => new Date(expense.date).toLocaleString('default', { year: 'numeric' }) === filterYear &&  expense.category === filtercategory);
    }
    const list = filteredExpense.map((expence) => <ExpenceItem record={expence} key={expence.id} />);

    return <Card className="expenses">
        <ExpenceFilter/>
        {list}
    </Card>
}

export default Expence;
