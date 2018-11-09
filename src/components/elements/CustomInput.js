import React from "react";

export default ({ type = "text", className, placeholder, value, onChange, onKeyUp = null, readOnly = false }) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      readOnly={readOnly}
    />
  )
}