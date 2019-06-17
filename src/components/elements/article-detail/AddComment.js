import React from 'react';

export default ({ value, userImage, onChange, postCommentAction }) => {
  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows="3"
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="card-footer">
        <img src={userImage} className="comment-author-img" alt="" />
        <button className="btn btn-sm btn-primary" onClick={postCommentAction}>
          Post Comment
        </button>
      </div>
    </form>
  );
};
