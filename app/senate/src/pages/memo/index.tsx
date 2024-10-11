/** @format */
import { FormEvent, memo, useState, createContext, useContext } from "react";
import { Button } from "antd";
import { handleReqQueue } from "./concurrentReqContr";

const superContext = createContext(false);

type MemoChildType = {
  name: string;
};
const MemoChild = (props: MemoChildType) => {
  const { name } = props;
  console.log("props 传入的 name", name);
  const [childIndex, setChildIndex] = useState(0);
  const changeChildIndex = () => {
    setChildIndex(childIndex + 2);
  };
  const childSoda = useContext(superContext);
  return (
    <div>
      <div>{name}</div>
      <Button onClick={changeChildIndex}>子组件内部更改state</Button>
      <div>childIndex:{childIndex}</div>
      <div>{["不喝", "喝"][+childSoda]}苏打水</div>
    </div>
  );
};
// 被memo包装的组件，在props没有改变时，不会更新该组件
const InMemoChild = memo(MemoChild);

const bigNumReqs = new Array(10).fill("").map(
  (item, index) => (): Promise<number> =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Math.random() < 0.2) {
          reject({
            msg: "获取数据失败",
          });
        }
        resolve(index);
      }, 300)
    )
);
const ReqTestRender = () => {
  return (
    <Button
      type="primary"
      onClick={() => {
        handleReqQueue(bigNumReqs);
      }}
    >
      发起批量请求
    </Button>
  );
};

const MemoRender = () => {
  const [count, setCount] = useState(0);
  const countClick = () => setCount(count + 1);
  const [name, setName] = useState("赵铁柱");
  const onNameChange = (e: React.FormEventHandler<HTMLInputElement>) => {
    const { value = "" } = e.target;
    setName(value);
  };
  const [soda, setSoda] = useState(false);
  const changeSoda = () => setSoda(!soda);
  return (
    <>
      <div>memo的用法</div>
      <Button onClick={countClick}>更新数字</Button>
      <div>count:{count}</div>
      <input type="text" value={name} onInput={onNameChange} />
      <Button onClick={changeSoda}>测试转换</Button>
      <div>-------------------</div>
      <superContext.Provider value={soda}>
        <InMemoChild name={name} />
      </superContext.Provider>
      <div>-------------------</div>
      <ReqTestRender />
    </>
  );
};

export default MemoRender;
