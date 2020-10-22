import React from 'react';
import ReactDOM from 'react-dom';
import FederatedComponentWrapper from './FederatedComponentWrapper';
const HeaderRedux = FederatedComponentWrapper(React.lazy(() => import('nav/HeaderRedux')));
import './index.css';

import { createStore } from 'redux';
function cartReducer(state = { count: 0 }, action) {
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
      <h1>Redux</h1>
      <HeaderRedux />
      <div>Hi there, I'm some cool product.</div> <button onClick={onAddToCart}>Buy me!</button>{' '}
      <div>Cart count is {count}</div>
    </div>
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
