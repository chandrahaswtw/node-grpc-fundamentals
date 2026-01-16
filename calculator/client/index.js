const grpc = require("@grpc/grpc-js");
const { CalculatorServiceClient } = require("./../proto/calculator_grpc_pb");
const { SumRequest } = require("./../proto/sum_pb");

function main() {
  // Accept connections without TLS encryption or authentication. In simple terms: No HTTPS, No certificates, Plain HTTP/2
  const creds = grpc.credentials.createInsecure();
  // Takes address of sever.
  const client = new CalculatorServiceClient("localhost:5001", creds);

  // Make request from client
  console.log("Calculator - client");

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

main();
