/*
The client will send one number (120) and the server will respond with a stream of (2,2,2,3,5), because 120=2*2*2*3*5 
*/

const { PrimeResponse } = require("./../proto/prime_pb");

exports.prime = (call, _) => {
  let num = call.request.getNum();
  let k = 2;
  console.log(typeof num);
  while (num > 1) {
    if (num % k === 0) {
      num = num / k;
      console.log(k);
      const res = new PrimeResponse();
      res.setResult(k);
      call.write(res);
    } else {
      k++;
    }
  }

  call.end();
};
