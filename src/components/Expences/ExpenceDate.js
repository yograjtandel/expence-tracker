import Card from "./UI/Card";
import './ExpenceDate.css';

function ExpenceDate(props) {

    let month = new Date(props.date).toLocaleString('default', { month: 'long' });
    let year = new Date(props.date).toLocaleString('default', { year: 'numeric' });
    let day = new Date(props.date).toLocaleString('default', { day: 'numeric' });
    return <Card className='expense-date'>
        <div className='expense-date__month'>{month}</div>
        <div className='expense-date__year'>{year}</div>
        <div className='expense-date__day'>{day}</div>
    </Card>
}

export default ExpenceDate;