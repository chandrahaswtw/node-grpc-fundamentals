const { MaxResponse } = require("./../proto/max_pb");

exports.max = (call, callback) => {
  console.log("Bi-directional streaming");

  let lastNumber;
  // As soon as we recieve the data from client we send.
  call.on("data", (req) => {
    const num = req.getNum();
    if (lastNumber === undefined) {
      lastNumber = num;
    }
    if (num >= lastNumber) {
      console.log(lastNumber, num);
      const res = new MaxResponse();
      res.setResult(num);
      call.write(res);
    }
    lastNumber = num;
  });

  call.on("end", (req) => {
    // After the client streaming got ended we then start server streaming.
    call.end();
  });
};
