/** @format */

import { fibonacci } from "./algorithm/index.mjs";
import { renderLog } from "./utils/index.mjs";
(() => {
  // 斐波那契数列
  const list = [];
  for (let i = 0; i < 10; i++) {
    list.push(fibonacci(i));
  }
  renderLog("斐波那契数列 START");
  console.log(list.join(","));
  renderLog("斐波那契数列 END");
})();
