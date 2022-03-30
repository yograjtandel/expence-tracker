// import { useState } from 'react';
import {useSelector} from 'react-redux'

import './Expence.css'
import Card from './UI/Card';
import ExpenceItem from './ExpenceItem';
import ExpenceFilter from './ExpenceFilter';



function Expence(props) {
    const Expences = useSelector( state => state.expences.expences)
    const filterYear = useSelector( state => state.expences.filterYear)
    const filteredExpense = Expences.filter((expense) => new Date(expense.date).toLocaleString('default', { year: 'numeric' }) === filterYear);
    const list = filteredExpense.map((expence) => <ExpenceItem record={expence} key={expence.id} />);

    return <Card className="expenses">
        <ExpenceFilter/>
        {list}
    </Card>
}

export default Expence;
