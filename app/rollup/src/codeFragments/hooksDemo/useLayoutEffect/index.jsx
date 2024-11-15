/** @format */

import { useState, useRef, useDeferredValue } from "react";
import { propsDisplay } from "../../utils/index.mjs";
export const BlockHeightChange = () => {
  const ref = useRef(null);
  const [blockHeight, setBlockHeight] = useState(100);
  const onBlockTouch = (e) => {
    const { x, y, height, width, top, right, bottom, left } =
      ref.current?.getBoundingClientRect?.();
    const data = { x, y, height, width, top, right, bottom, left };
    console.log(propsDisplay(data));
  };
  const onChangeBlockHeight = () => {
    setBlockHeight(blockHeight + 1);
  };
  const deferredHeight = useDeferredValue(blockHeight);
  return (
    <>
      <div
        ref={ref}
        onClick={onBlockTouch}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#ee1a1e",
        }}
      ></div>
      <div>blockHeight: {blockHeight}</div>
      <div>deferredHeight: {deferredHeight}</div>
      <input type="button" value="更新高度" onClick={onChangeBlockHeight} />
    </>
  );
};
