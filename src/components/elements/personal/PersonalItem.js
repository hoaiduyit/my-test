import React from "react";
import _ from "lodash";

export default ({ authorName, authorImage, authorDescription, userInfo }) => {
  return (
    <div className="col-xs-12 col-md-10 offset-md-1">
      <img src={authorImage} className="user-img" alt="" />
      <h4>{authorName}</h4>
      <p>
        {authorDescription}
      </p>
      {!_.isEmpty(userInfo) && userInfo.username !== authorName && (
        <button className="btn btn-sm btn-outline-secondary action-btn">
          <i className="ion-plus-round"></i>
          &nbsp;
        Follow {authorName}
        </button>
      )}
    </div>
  )
}