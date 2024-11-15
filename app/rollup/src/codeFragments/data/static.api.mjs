/** @format */
import { data } from "./data.mjs";

export const getDataApi = ({
  duration = 1e3,
  textLen = 20,
  count = 1,
  random = 1,
}) => {
  return new Promise((resolve, reject) => {
    const { text } = data;
    const len = text.length;
    const canStartIndex = Math.floor(len - textLen);
    const list = new Array(count).fill("").map(() => {
      const startIndex = Math.floor(Math.random() * canStartIndex);
      return {
        content: text.slice(startIndex, startIndex + textLen),
      };
    });

    if (Math.random() >= random) {
      reject({
        code: 1,
        message: "测试数据随机失败",
      });
    } else {
      setTimeout(() => {
        resolve({
          code: 0,
          message: "获取数据成功！",
          list,
        });
      }, duration);
    }
  });
};
