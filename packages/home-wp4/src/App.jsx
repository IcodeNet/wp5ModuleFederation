import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const useDynamicScript = (url) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement('script');
    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

const DynamicWidget = ({ url, scope, module, ...props }) => {
  const { ready, failed } = useDynamicScript(url);

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(
    () =>
      new Promise((moduleResolve) => {
        // we need to init the
        const react = require('react');
        const reactDom = require('react-dom');
        const deps = require('./../package.json').dependencies;

        const legacyShareScope = {
          'react': {
            [react.version]: {
              get: () =>
                new Promise((reactResolve) => {
                  reactResolve(() => react);
                }),
              loaded: true,
              from: 'webpack4',
              singleton: true,
            },
          },
          'react-dom': {
            [reactDom.version]: {
              get: () =>
                new Promise((resolve) => {
                  resolve(() => reactDom);
                }),
              loaded: true,
              from: 'webpack4',
              singleton: true,
            },
          },
        };

        if (!window[scope]) {
          new Promise((containerResolve) => {
            containerResolve(window[scope].init(legacyShareScope));
          }).then(() => {
            window[scope].get(module).then((factory) => {
              moduleResolve(factory());
            });
          });
        } else {
          window[scope].get(module).then((factory) => {
            moduleResolve(factory());
          });
        }
      })
  );

  return (
    Component && (
      <React.Suspense fallback='Loading from nav a widget or component that we need.'>
        <Component {...props} />
      </React.Suspense>
    )
  );
};

const App = () => {
  const [itemCount, itemCountSet] = React.useState(0);

  const onAddToCart = () => {
    itemCountSet(itemCount + 1);
  };

  return (
    <div>
      <DynamicWidget
        url={'http://localhost:3001/remoteEntry.js'}
        scope={'nav'}
        module={'./Header'}
        count={itemCount}
        onClear={() => itemCountSet(0)}
      />
      <hr />
      <button onClick={onAddToCart}>Buy me!</button> to buy {itemCount} items.
      <div>React with Webpack 4, and I can load dynamicaly a remote component or widget..</div>
      <p> We just need to know the scope and url, plus the name of the component that we want to load.</p>
      <p>
        {' '}
        So knowing that we expose under `http://localhost:3001/remoteEntry.js` url and scope `nav` a component called
        header, we can use our DynamicWidget to get the component to use.
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
