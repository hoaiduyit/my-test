import React from "react";
import moment from "moment";
import CustomLink from "./CustomLink"
import TagList from "./TagList"

export default ({
  author,
  createAt,
  articleId,
  likeCount,
  title,
  description,
  tagList = [],
  handleLikeArticle }) => {
  const { image, username } = author;
  const convertedDate = moment(createAt).format("MM-DD-YYYY");
  return (
    <div className="article-preview">
      <div className="article-meta" >
        <CustomLink children={<img src={image} alt="" />} url={`/profile/${username}`} />
        <div className="info">
          <CustomLink children={username} url={`/profile/${username}`} className="author" />
          <span className="date">{convertedDate}</span>
        </div>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={handleLikeArticle}>
        <i className="ion-heart"></i> {likeCount}
      </button>
      <CustomLink url={`/article/${articleId}`} children={<span className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <TagList tagList={tagList} />
      </span>} />

    </div>
  )
}