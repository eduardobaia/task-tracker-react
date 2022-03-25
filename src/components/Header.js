import PropTypes from "prop-types";
import { Button } from "./Button";

import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  const onClick = () => {
    console.log("CLICKEEE ");
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      {/* <h1 style={headingStyle}>{title}</h1> */}
      { location.pathname === '/'  && <Button
        onClick={onAdd}
        color={!showAdd ? "green" : "red"}
        text={!showAdd ? "Add" : "Close"}
      /> } 
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker.",
};

Header.protoTypes = {
  title: PropTypes.string,
};

// const headingStyle={
//   color:'blue',
//   backgroundColor:'black'
// }

export default Header;
