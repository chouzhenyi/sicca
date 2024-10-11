/** @format */

type reqType = () => Promise<number>;

/**
 * @description 并发请求队列
 * @param concurrency: 并发数量
 * @returns
 */
const requestQueue = (reqQueue: reqType[] = [], concurrency = 6) => {
  let current = 0;
  const dequeue = () => {
    while (current < concurrency && reqQueue.length) {
      current++;
      const reqFn = reqQueue.shift();
      reqFn?.()
        .then((num) => {
          console.log("返回数据", num);
        })
        .catch((error: Error) => {
          console.log(error);
        })
        .finally(() => {
          current--;
          dequeue();
        });
    }
  };
  dequeue();
};

export const handleReqQueue = async (reqs: reqType[]) => {
  requestQueue([...reqs]);
};
