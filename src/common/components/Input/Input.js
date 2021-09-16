import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";

function Input({ type, title, value, onChange, fullWidth }) {
  return (
    <form className={`yekta-input-container ${fullWidth ? "fullWidth" : ""}`}>
      <label>
        <h6>{title}</h6>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </form>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
};

Input.defaultProps = {
  value: "",
  onChange: () => {},
  fullWidth: false,
  type: "text",
  title: "",
};

export default Input;
