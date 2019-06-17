import React from 'react';
import moment from 'moment';
import CustomLink from '../CustomLink';

export default ({
  commentId,
  name,
  image,
  comment,
  createdDate,
  user,
  handleDeleteComment,
}) => {
  const formatDate = moment(createdDate).format('MM-DD-YYYY');
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
          <span
            className="mod-options"
            onClick={e => handleDeleteComment(e, commentId)}
          >
            <i className="ion-trash-a" />
          </span>
        )}
      </div>
    </div>
  );
};
