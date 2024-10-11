/** @format */
import { useRef, useState } from "react";
import { Button, Upload } from "antd";
import { UploadProps } from "antd";
import styles from "./style.module.less";

const readFile = (file: File): Promise<string> => {
  const reader = new FileReader();
  reader.onprogress = (e) => {
    const { loaded, total } = e;
    if (loaded && total) {
      const percent = Math.floor((loaded * 100) / total);
      console.info(`已经下载${percent}%`);
    }
  };

  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onload = (e) => {
      resolve(e?.currentTarget?.result);
    };
  });
};

const base64CodeHandler = () => {
  const base64DemoStr = "base64 incode decode";
  // 编码
  const incode = btoa(base64DemoStr);
  console.log(`字符串编码: ${incode}`);
  // 解码
  const decode = atob(incode);
  console.log(`字符串解码: ${decode}`);
};

const base64ToUnit8Array = (
  data: string
): { type: string; u8arr: Uint8Array } => {
  const arr = data.split(",");
  const type = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return {
    type,
    u8arr,
  };
};

const base64ToBlob = (data: string) => {
  const { type, u8arr } = base64ToUnit8Array(data);
  return new Blob([u8arr], { type });
};

const base64ToFile = (data: string, fileName: string) => {
  const { type, u8arr } = base64ToUnit8Array(data);
  return new File([u8arr], fileName, { type });
};

const Watermark = () => {
  const [imageList, setImageList] = useState<string[]>([]);
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 200, height: 200 });
  const [downloadLinkList, setDownloadLinkList] = useState<
    { link: string; name: string }[]
  >([]);

  const getImageSize = (url: string) => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = (e) => {
        const { naturalWidth: width, naturalHeight: height } = e.target;
        resolve({
          img,
          width,
          height,
        });
      };
    });
  };
  const drawImage = ({ img, width, height, text }): Promise<string> => {
    const dom = canvasRef.current;
    const ctx = dom.getContext("2d");
    ctx.translate(0, 0);
    ctx.drawImage(img, 0, 0);
    ctx.translate(width / 2, height / 2);
    ctx.rotate((-30 * Math.PI) / 180);
    const rate = width / 800;
    const fontSize = 14 * rate;
    ctx.font = `italic small-caps bold ${fontSize}px/${fontSize}px arial`;
    const { width: fontWidth } = ctx.measureText(text);
    console.log(`字体大小: ${fontSize}px; 字宽: ${fontWidth}px;`);
    const fontCenterX = -fontWidth / 2;
    const fontCenterY = -fontSize / 2;
    ctx.fillText(text, fontCenterX, fontCenterY);
    ctx.beginPath();
    ctx.lineWidth = 2 * rate;
    const paddingSize = 10 * rate;
    ctx.rect(
      fontCenterX - paddingSize,
      -fontSize - paddingSize,
      fontWidth + 2 * paddingSize,
      fontSize + paddingSize
    );
    ctx.stroke();
    return new Promise((resolve) => {
      setTimeout(() => {
        const dataURL = dom.toDataURL();
        resolve(dataURL);
      });
    });
  };

  const fileUploadProps: UploadProps = {
    accept: "image/*",
    showUploadList: false,
    beforeUpload: () => false,
    onChange: async ({ file }) => {
      // 转临时地址
      const tempUrl = URL.createObjectURL(file);
      const base64 = await readFile(file as File);
      const transFile = base64ToFile(base64, "result.jpg");
      console.log("base64 转File后的文件：", transFile);
      const transBlob = base64ToBlob(base64);
      console.log("base64 转blob后的文件：", transBlob);

      // 转临时地址
      console.log(tempUrl);
      setImageList([...imageList, tempUrl]);
      base64CodeHandler();
      const { img, width, height } = await getImageSize(tempUrl);
      setCanvasSize({ width, height });
      drawImage({ img, width, height });

      setTimeout(async () => {
        const canvasBase64 = await drawImage({
          img,
          width,
          height,
          text: "用于银行取现1亿专用",
        });
        const canvasFile = base64ToFile(canvasBase64, "result.png");
        const url = URL.createObjectURL(canvasFile);
        console.log(url);
        const name = `${Date.now()}.png`;
        setDownloadLinkList([
          ...downloadLinkList,
          {
            link: url,
            name,
          },
        ]);
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = `${Date.now()}.png`;
        // link.appendChild(document.createTextNode("下载链接"));
      });
    },
  };
  const { width, height } = canvasSize;
  return (
    <div className={styles.watermark}>
      <Upload {...fileUploadProps}>
        <Button type="primary">选择图片</Button>
      </Upload>
      <div className={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={styles.canvas}
        ></canvas>
      </div>
      <div className={styles.imgList}>
        {imageList.map((img, index) => {
          return <img src={img} key={index} className={styles.img} />;
        })}
      </div>
      <div className={styles.linkList}>
        {downloadLinkList.map((item, index) => (
          <a href={item.link} download={item.name} key={index}>
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Watermark;
