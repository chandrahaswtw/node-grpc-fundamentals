const { SumResponse } = require("./../proto/sum_pb");

exports.sum = (call, callback) => {
  const res = new SumResponse().setResult(
    call.request.getNum1() + call.request.getNum2()
  );

  //Null for error
  callback(null, res);
};
