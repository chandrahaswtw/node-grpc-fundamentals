/*
Same as discussed in serviceImpl.js
*/

const grpc = require("@grpc/grpc-js");
const { GreetServiceClient } = require("./../proto/greet_grpc_pb");
const { GreetRequest } = require("./../proto/greet_pb");

function greetOnce(client) {
  // Make request from client
  console.log("Greet - client");
  const req = new GreetRequest().setFirstName("Chandrahas here");

  // This .greet should align with the method name what we exported in serviceImpl
  client.greet(req, (err, res) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Res sent successfully ${res.getResult()}`);
    client.close();
  });
}

function greetManyTimes(client) {
  // Make request from client
  console.log("Greet - client");
  const req = new GreetRequest().setFirstName("Chandrahas here");

  // This .greet should align with the method name what we exported in serviceImpl
  const call = client.greetManyTimes(req);
  call.on("data", (res) => {
    console.log(`Res sent successfully ${res.getResult()}`);
  });
}

function main() {
  // Accept connections without TLS encryption or authentication. In simple terms: No HTTPS, No certificates, Plain HTTP/2
  const creds = grpc.credentials.createInsecure();
  // Takes address of sever.
  const client = new GreetServiceClient("localhost:5001", creds);
  //greetOnce(client);
  greetManyTimes(client);
}

main();
