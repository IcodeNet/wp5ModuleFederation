import React from 'react';
import { connect } from 'react-redux';
const HeaderRedux = ({ count, dispatch }) => (
  <header style={{ fontSize: 'xx-large ' }}>
    <h2> Isolaled Header Redux Component</h2>
    <span>Header - Cart count is {count}</span>
    <button onClick={() => dispatch({ type: 'RESET' })}>Clear</button>{' '}
  </header>
);
export default connect((state) => state)(HeaderRedux);
