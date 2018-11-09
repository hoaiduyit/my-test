import React from "react";
import _ from "lodash";

export default ({ listError, errorKey }) => {
  return (
    <ul className="error-messages">
      {listError && !_.isEmpty(listError) && listError[errorKey].map((item, index) => {
        if (item === "can't be blank") {
          return <li key={`${errorKey}_error_${index}`}>{item}</li>
        }
        return <li key={`${errorKey}_error_${index}`}>{item}</li>
      })}
    </ul>
  )
}