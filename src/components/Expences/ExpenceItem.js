import "./ExpenceItem.css";
import Card from "./UI/Card";
import ExpenceDate from "./ExpenceDate";

function ExpenceItem(props) {
  return (
    <Card className="expense-item">
      <ExpenceDate date={props.record.date} />
      <div className="expense-item__description">
          <div class="detail">
            <span>title : {props.record.title}</span>
            { props.record.category && <span>category : {props.record.category}</span> }
          </div>

          <div>
            {props.record.billURL && (
              <img
                src={props.record.billURL}
                alt="bill"
                width="70"
                height="70"
              />
            )}
          </div>
        <Card className="expense-item__price">{props.record.amount}</Card>
      </div>
    </Card>
  );
}

export default ExpenceItem;
