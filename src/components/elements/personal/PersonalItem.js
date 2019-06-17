import React from 'react';
import _ from 'lodash';

export default ({
  authorName,
  authorImage,
  followingAuthors,
  authorDescription,
  userInfo,
  handleFollowAuthor,
}) => {
  let isFollowing = false;
  followingAuthors &&
    !_.isEmpty(followingAuthors) &&
    followingAuthors.filter(item => {
      if (authorName === item.authorName) {
        isFollowing = true;
      }
    });

  return (
    <div className="col-xs-12 col-md-10 offset-md-1">
      <img src={authorImage} className="user-img" alt="" />
      <h4>{authorName}</h4>
      <p>{authorDescription}</p>
      {!_.isEmpty(userInfo) && userInfo.username !== authorName && (
        <button
          className="btn btn-sm btn-outline-secondary action-btn"
          onClick={e => handleFollowAuthor(e, authorName, isFollowing)}
        >
          <i className="ion-plus-round" />
          &nbsp;
          {isFollowing ? `Unfollow ${authorName}` : `Follow ${authorName}`}
        </button>
      )}
    </div>
  );
};
