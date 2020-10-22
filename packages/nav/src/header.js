import React from 'react';
const Header = ({ count = 0, onClear }) => (
  <header style={{ fontSize: 'xx-large ' }}>
    <h2> Isolaled Header Component 2</h2>
    <span>Header - Cart count is {count}</span>
    <button onClick={onClear}>Clear</button>{' '}
  </header>
);
export default Header;
