
const Button = ({onClick, showShort}) => {
    return(
        <button type="button" onClick={onClick} className="btn btn-secondary">
            {showShort && "Read More"}
            {!showShort && "Read Less"}
        </button>
    )
}

export default Button;