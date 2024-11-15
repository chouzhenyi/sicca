/** @format */

class store {
  constructor() {
    this.storeNum = 0;
  }
  subscribe(callback) {
    window.addEventListener("store-num-change", callback);
    return () => {
      console.log("store change event");
    };
  }
  getSnapShot() {
    return this.storeNum;
  }
}

export default () => {};
