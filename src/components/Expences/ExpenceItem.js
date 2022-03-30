import './ExpenceItem.css'
import Card from './UI/Card';
import ExpenceDate from './ExpenceDate';

function ExpenceItem(props) {
    return <Card className='expense-item'>
        <ExpenceDate date={props.record.date}/>
        <div className='expense-item__description'>
            <h2>{props.record.title}</h2>
            <Card className='expense-item__price'>{props.record.amount}</Card>
        </div>
    </Card>
}

export default ExpenceItem;
