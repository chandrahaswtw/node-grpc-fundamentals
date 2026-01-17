const { AvgResponse } = require("./../proto/avg_pb");

exports.avg = (call, callback) => {
  console.log("Client streaming");

  let nums = [];

  call.on("data", (req) => {
    nums.push(req.getNum());
  });

  call.on("end", (req) => {
    const avgNums = nums.reduce((acc, cur) => acc + cur, 0) / nums.length;
    const res = new AvgResponse();
    res.setResult(avgNums);
    callback(null, res);
  });
};
