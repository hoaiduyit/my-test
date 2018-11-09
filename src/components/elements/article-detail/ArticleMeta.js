import React from "react";
import moment from "moment";
import CustomLink from "../CustomLink";

export default ({
  ownerName,
  ownerImage,
  createdDate,
  likeCount,
  favoriteCount,
  userInfo,
  articleId,
  deleteArticle,
  isShow = false
}) => {
  const date = moment(createdDate).format("MM-DD-YYYY");
  return (
    <div className="article-meta">
      <img src={ownerImage} alt="" />
      <div className="info">
        <CustomLink url={`/profile/${ownerName}`} className="author" children={ownerName} />
        <span className="date">{date}</span>
      </div>
      {userInfo && userInfo.username && userInfo.username === ownerName ? (
        <span>
          {isShow && (
            <span>
              <CustomLink
                url={`/update-article/${articleId}`}
                className="btn btn-sm btn-outline-secondary"
                children={
                  <span>
                    <i className="ion-edit" />&nbsp;Edit article
                  </span>
                }
              />
              &nbsp; &nbsp;
              <button className="btn btn-outline-danger btn-sm" onClick={deleteArticle} >
                <i className="ion-trash-a"></i> Delete Article
              </button>
            </span>
          )}
        </span>
      ) : (
          <span>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;Follow {ownerName} <span className="counter">{favoriteCount}</span>
            </button>
            &nbsp; &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;Favorite Post <span className="counter">{likeCount}</span>
            </button>
          </span>
        )}
    </div>
  )
}