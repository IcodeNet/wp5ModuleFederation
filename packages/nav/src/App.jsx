import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import HeaderRedux from './header-redux';

import { createStore } from 'redux';
function cartReducer(state = { count: 4 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
}
const store = createStore(cartReducer);
import { Provider, connect } from 'react-redux';

const App = connect((state) => state)(({ count, dispatch }) => {
  const onAddToCart = () => {
    dispatch({
      type: 'INCREMENT',
    });
  };
  return (
    <div>
      <h2>Nav or component source</h2>
      <Header />
      <HeaderRedux />
    </div>
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
