self.onmessage = function (e) {
  console.log(e.data);
  // 向主文件发送信息
  self.postMessage("从到主");
};
