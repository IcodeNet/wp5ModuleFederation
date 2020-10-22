import React from 'react';
import ReactDOM from 'react-dom';
import FederatedComponentWrapper from './FederatedComponentWrapper';
const HeaderRecoil = FederatedComponentWrapper(React.lazy(() => import('nav/HeaderRecoil')));

import './index.css';

import { useRecoilState, RecoilRoot } from 'recoil';
import { cartCount } from './atoms';

const App = () => {
  // it’s almost a plug and play replacement for useState.
  // If more than one component need the state we make an atom
  // and point both components at it by just replacing useState with useRecoilState.
  const [itemCount, itemCountSet] = useRecoilState(cartCount);
  const onAddToCart = () => {
    itemCountSet(itemCount + 1);
  };
  return (
    <div>
      <HeaderRecoil />
      <div>Hi there, I'm some cool product.</div>
      <button onClick={onAddToCart}>Buy me!</button>
      <div>Cart count is {itemCount}</div>
    </div>
  );
};
ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('app')
);
