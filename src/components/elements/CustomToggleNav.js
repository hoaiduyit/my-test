import React from 'react';

export default ({
  isShow = true,
  tagName = '',
  active,
  toggleKey_1,
  toggleKey_2,
  toggleText_1,
  toggleText_2,
  onClick,
}) => {
  return (
    <ul className="nav nav-pills outline-active">
      {isShow && (
        <li style={{ cursor: 'pointer' }} className="nav-item">
          <span
            onClick={() => onClick(toggleKey_1)}
            className={`nav-link ${active === toggleKey_1 ? 'active' : ''}`}
          >
            {toggleText_1}
          </span>
        </li>
      )}
      <li style={{ cursor: 'pointer' }} className="nav-item">
        <span
          onClick={() => onClick(toggleKey_2)}
          className={`nav-link ${
            active === toggleKey_2 ? 'active' : ''}`}
        >
          {toggleText_2}
        </span>
      </li>
      {tagName !== '' && (
        <li style={{ cursor: 'pointer' }} className="nav-item">
          <span
            onClick={() => onClick(tagName)}
            className={`nav-link ${
              active === tagName && active !== 'globalFeed' ? 'active' : ''}`}
          >
            {tagName}
          </span>
        </li>
      )}
    </ul >
  );
};
