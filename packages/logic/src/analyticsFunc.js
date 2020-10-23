// we have a function here in our logic that we want to share
// that can be used to send analytics.
// in the consumer of this logic webpack we provide a module
// through a promise. We will take the module's default, which will be our function
// and call it. See how this is done in home-logic
const analyticsFunc = (msg) => console.log(`Analytics msg: ${msg}`);
export default analyticsFunc;
