import "./Card.css"

function Card(props) {
    let css = "card " + props.className;
    return <div className={css}>{props.children}</div>
}
export default Card;
