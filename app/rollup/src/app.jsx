/** @format */

import { useState } from "react";
import { createRoot } from "react-dom/client";

const getDataApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        a: "数据A",
        b: "数据B",
        c: "数据C",
      });
    }, 5e3);
  });
};

const appDictData = {};

const getSourceProxy = new Proxy(
  {},
  {
    get: async (target, property) => {
      const targetDict = appDictData[property];
      console.log(targetDict);
      if (targetDict) {
        return targetDict;
      }

      const data = await getDataApi();
      console.log(data);
      appDictData[property] = data;
      Reflect.set(target, property, data);

      return {};
    },
  }
);

const Greet = () => {
  const [num, setNum] = useState(0);
  const setNumFn = () => {
    setNum(num + 1);
    console.log(num);
  };
  const getDictItem = () => {
    console.log(getSourceProxy);
    // console.log(getSourceProxy?.a);
  };
  return (
    <>
      <p> Hello, world!{num}条人</p>
      <input type="button" value={"增加"} onClick={setNumFn} />
      <input type="button" value="字典数据A" onClick={getDictItem} />
    </>
  );
};
const root = createRoot(document.querySelector("#react-app"));
root.render(<Greet />);
