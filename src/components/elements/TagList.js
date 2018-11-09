import React from "react";
import _ from "lodash";

export default ({ tagList }) => {
  return (
    <ul className="tag-list">
      {!_.isEmpty(tagList) && tagList.map((item, index) => {
        return (
          <li key={`tag_${index}`} className="tag-default tag-pill tag-outline">{item}</li>
        )
      })}
    </ul>
  )
}