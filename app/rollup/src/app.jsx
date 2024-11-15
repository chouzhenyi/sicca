/** @format */

import { useState } from "react";
import { createRoot } from "react-dom/client";
import { getDataApi } from "./codeFragments/data/index.mjs";
import { BlockHeightChange } from "./codeFragments/hooksDemo/index.mjs";

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
  const actionButtonList = [
    {
      title: "获取随机数据",
      actionClick: async () => {
        const res = await getDataApi({});
        console.log("测试获取数据", res);
      },
    },
  ];
  return (
    <>
      <h1>功能碎片</h1>
      {actionButtonList.map((actionItem, key) => (
        <input
          type="button"
          key={key}
          value={actionItem.title}
          onClick={actionItem.actionClick}
        />
      ))}
      <BlockHeightChange />
    </>
  );
};
const root = createRoot(document.querySelector("#react-app"));
root.render(<Greet />);
