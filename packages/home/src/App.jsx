import React from 'react';
import ReactDOM from 'react-dom';
import FederatedComponentWrapper from './FederatedComponentWrapper';
const Header = FederatedComponentWrapper(React.lazy(() => import('nav/Header')));
import './index.css';
const App = () => {
  const [itemCount, itemCountSet] = React.useState(0);
  const [version, versionSet] = React.useState(null);
  const onAddToCart = () => {
    itemCountSet(itemCount + 1);
  };

  React.useEffect(() => {
    import('nav/library')
      .then(({ default: version }) => versionSet(version))
      .catch((err) => console.error(`Error getting version value: ${err}`));
  }, []);

  return (
    <div>
      <h1> intrinsic state 3</h1>
      <Header count={itemCount} onClear={() => itemCountSet(0)} />
      <div>Hi there, I'm some cool product.</div> <button onClick={onAddToCart}>Buy me!</button>{' '}
      <div>Cart count is {itemCount}</div>
      <br />
      <div>We are using the Tote component library version {version}</div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));
