/** @format */

const http = require("http");
const fs = require("fs");
const path = require("path");

// 创建服务器
const server = http.createServer((req, res) => {
  // 指定默认页面路径
  const defaultPage = "index.html";
  const { url } = req;
  const filePath = path.join(process.cwd(), url !== "/" ? url : defaultPage);
  console.log(req.url);
  // 读取文件并发送响应
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, "Not Found");
      res.end("Error: File not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

// 监听端口
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
