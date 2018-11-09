import React from "react";
import moment from "moment"
import CustomLink from "../CustomLink"

export default ({ name, image, comment, createdDate, user }) => {
  const formatDate = moment(createdDate).format("MM-DD-YYYY");
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment}</p>
      </div>
      <div className="card-footer">
        <CustomLink
          url={`/profile/${name}`}
          className="comment-author"
          children={<img src={image} className="comment-author-img" alt="" />}
        />
        &nbsp;
        <CustomLink
          url={`/profile/${name}`}
          className="comment-author"
          children={name}
        />
        <span className="date-posted">{formatDate}</span>
        {user && user.username === name && (
          <span className="mod-options">
            <i className="ion-edit"></i>
            <i className="ion-trash-a"></i>
          </span>
        )}
      </div>
    </div>
  )
}