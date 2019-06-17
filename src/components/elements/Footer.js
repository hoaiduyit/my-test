import React from 'react';
import CustomLink from './CustomLink';

export default () => {
  return (
    <footer>
      <div className="container">
        <CustomLink url="/" className="logo-font" children="conduit" />
        <span className="attribution">
          An interactive learning project from{' '}
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  );
};
