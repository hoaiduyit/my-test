import React from 'react';

export default ({ text, className }) => {
  const style = {
    color: '#5cb85c',
    fontWeight: 700,
  };
  return (
    <ul style={style} className={className}>
      <li>{text}</li>
    </ul>
  );
};
