// this will be used in the home logic
// we will import dynamically
// const classExport = import("logic/classExport");
// and remember we are getting a promise of a module with a default property in this case.
// we will alias the default to something like classRef.
// We can then new the classRef and access the logString() function or any other members.

/// <remarks>
/// <see cref="../../home-logic/src/App.js"/>
/// </remarks>
class MyClass {
  constructor(value) {
    this.value = value;
  }

  logString() {
    console.log(`Logging ${this.value}`);
  }
}

export default MyClass;
