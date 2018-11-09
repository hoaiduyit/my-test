import React from "react";
import moment from "moment";

export default ({ ownerName, ownerImage, createdDate, likeCount, favoriteCount }) => {
  const date = moment(createdDate).format("MM-DD-YYYY");
  return (
    <div className="article-meta">
      <span><img src={ownerImage} alt="" /></span>
      <div className="info">
        <a href="" className="author">{ownerName}</a>
        <span className="date">{date}</span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp;Follow {ownerName} <span className="counter">{favoriteCount}</span>
      </button>
      &nbsp;&nbsp;
        <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp;Favorite Post <span className="counter">{likeCount}</span>
      </button>
    </div>
  )
}