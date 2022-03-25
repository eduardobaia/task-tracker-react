import PropTypes from "prop-types";
export const Button = ({ color, text, onClick }) => {
 
  return (
    <button 
    className="btn" 
    style={{ backgroundColor: color }}
    onClick={onClick}
    >
      {text}{" "}
    </button>
  );
};

Button.defaultProps = {
  color: "steelblue",
};
Button.prototype = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
