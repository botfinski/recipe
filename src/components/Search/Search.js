import React from "react";
import PropTypes from "prop-types";
import "./Search.scss";

const search = props => (
  <div className="Search">
    <form onSubmit={props.handleSearch}>
      <input placeholder="Search..." className="SearchInput" type="text" ref={props.inputRef} />

      <button className="SubmitButton" type="submit">
        Search
      </button>

      <button type="button" className="MenuToggle" onClick={props.handleMenuToggle}>
        {props.menuOpened ? <span>&#9650;</span> : <span>&#9660;</span>}
      </button>

      {props.children}
    </form>
  </div>
);

search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
  menuOpened: PropTypes.bool.isRequired
};

export default search;
