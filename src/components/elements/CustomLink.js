import React from 'react';
import { Link } from 'react-router-dom';

export default ({ className = '', url = '', children }) => {
  return (
    <Link to={url}>
      <span className={className}>{children}</span>
    </Link>
  );
};
