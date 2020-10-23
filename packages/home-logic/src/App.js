import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// const analyticsFunc = import("logic/analyticsFunc");
// const sendAnalytics = (msg) => {
//   analyticsFunc
//     .then(({ default: analyticsFunc }) => analyticsFunc(msg))
//     .catch((err) => console.log(`Error sending analytics value: ${msg}`));
// };

// const createAsyncFunc = (promise) => (...args) =>
//   promise
//     .then(({ default: func }) => func(...args))
//     .catch((err) =>
//       console.log(`Error sending analytics value: ${JSON.stringify(args)}`)
//     );

// const sendAnalytics = createAsyncFunc(import("logic/analyticsFunc"));

const queuedFunction = (funcPromise) => {
  let queueFunc = null;
  const queue = [];
  let pending = false;

  return (msg) => {
    // function is resolved so use
    if (queueFunc) {
      queueFunc(msg);
    } else {
      // not resolve yet. Queue messages till we are ready
      queue.push(msg);

      if (!pending) {
        pending = true;
        funcPromise
          .then((func) => {
            queueFunc = func;
            // function is resolved now from dynamic import so call using the messages.
            queue.forEach(queueFunc);
            queue = [];
          })
          .catch((err) => console.log(`Error getting queued function`));
      }
    }
  };
};

const sendAnalytics = queuedFunction(import('logic/analyticsFunc').then(({ default: func }) => func));

const newClassObject = (...args) =>
  import('logic/classExport')
    .then(({ default: classRef }) => {
      return new classRef(...args);
    })
    .catch((err) => console.log(`Error getting class: ${err}`));

newClassObject('initial value').then((theObject) => {
  theObject.logString();
});

sendAnalytics('Application startup');

const SingleValue = () => {
  const [singleValue, singleValueSet] = React.useState(null);

  React.useEffect(() => {
    import('logic/singleValue')
      .then(({ default: value }) => singleValueSet(value))
      .catch((err) => console.error(`Error getting single value: ${err}`));
  }, []);

  return <div>Single value: {singleValue}.</div>;
};

const ArrayValue = () => {
  const [arrayValue, arrayValueSet] = React.useState(null);

  React.useEffect(() => {
    import('logic/arrayValue')
      .then(({ default: value }) => arrayValueSet(value))
      .catch((err) => console.error(`Error getting array value: ${err}`));
  }, []);

  return <div>Array value: {JSON.stringify(arrayValue)}.</div>;
};

const ObjectValue = () => {
  const [objectValue, objectValueSet] = React.useState(null);

  React.useEffect(() => {
    import('logic/objectValue')
      .then(({ default: value }) => objectValueSet(value))
      .catch((err) => console.error(`Error getting object value: ${err}`));
  }, []);

  return <div>Object value: {JSON.stringify(objectValue)}.</div>;
};

const App = () => {
  sendAnalytics('Rendering');

  return (
    <div>
      <h1>Home that is using a dynamically imported logic module.</h1>
      <p> This app is using a logic module that we dynamically import.</p>
      <i>Open the devtools and check how we are utilising an analytics function, coming from the logic module.</i>
      <hr />
      <SingleValue />
      <ArrayValue />
      <ObjectValue />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
