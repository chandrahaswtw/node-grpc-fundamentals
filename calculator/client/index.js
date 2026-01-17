const grpc = require("@grpc/grpc-js");
const { CalculatorServiceClient } = require("./../proto/calculator_grpc_pb");
const { SumRequest } = require("./../proto/sum_pb");
const { PrimeRequest } = require("./../proto/prime_pb.js");
const { AvgRequest } = require("./../proto/avg_pb.js");
const { MaxRequest } = require("./../proto/max_pb.js");

// Unary
function getSum(client) {
  // This is how we pass multiple values
  const req = new SumRequest().setNum1(2).setNum2(3);
  client.sum(req, (err, res) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Res sent successfully ${res.getResult()}`);
    client.close();
  });
}

// Server streaming
function getPrimes(client) {
  const req = new PrimeRequest().setNum(24);
  const call = client.prime(req);
  call.on("data", (res) => {
    console.log(`Res sent successfully ${res.getResult()}`);
  });
}

// Client streaming
function getAvg(client) {
  const nums = [2, 3, 4, 5];
  const req = new AvgRequest();
  const call = client.avg(req, (err, res) => {
    if (err) {
      console.log("Error");
      return console.log(err);
    }
    console.log(`Avg is ${res.getResult()}`);
  });
  nums
    .map((num) => new AvgRequest().setNum(num))
    .forEach((req) => call.write(req));
  call.end();
}

// Bi-directional streaming
function getMax(client) {
  const nums = [1, 5, 3, 6, 2, 20];
  const req = new MaxRequest();
  const call = client.max(req, (err, res) => {
    if (err) {
      return console.log(err);
    }
  });

  // Send it to server
  nums
    .map((num) => new MaxRequest().setNum(num))
    .forEach((req) => call.write(req));

  call.on("data", (res) => {
    console.log(res.getResult());
  });

  call.end();
}

function main() {
  // Accept connections without TLS encryption or authentication. In simple terms: No HTTPS, No certificates, Plain HTTP/2
  const creds = grpc.credentials.createInsecure();
  // Takes address of sever.
  const client = new CalculatorServiceClient("localhost:5001", creds);
  // getSum(client);
  // getPrimes(client);
  // getAvg(client);
  getMax(client);
}

main();
