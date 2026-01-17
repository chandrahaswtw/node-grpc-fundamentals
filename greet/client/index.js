/*
Same as discussed in serviceImpl.js
*/

const grpc = require("@grpc/grpc-js");
const { GreetServiceClient } = require("./../proto/greet_grpc_pb");
const { GreetRequest } = require("./../proto/greet_pb");

// Unary request
function greetOnce(client) {
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

// Server streaming
function greetManyTimes(client) {
  const req = new GreetRequest().setFirstName("Chandrahas here");
  // This .greet should align with the method name what we exported in serviceImpl
  const call = client.greetManyTimes(req);
  call.on("data", (res) => {
    console.log(`Res sent successfully ${res.getResult()}`);
  });
}

//Client streaming
function longGreet(client) {
  const names = ["Chandrahas", "Robert", "Ford"];
  const req = new GreetRequest();
  const call = client.longGreet(req, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Long greet ${res.getResult()}`);
  });
  names
    .map((name) => new GreetRequest().setFirstName(name))
    .forEach((req) => call.write(req));
  call.end();
}

//Bi-directional streaming
function greetEveryone(client) {
  // We send request from client first

  const names = ["Chandrahas", "Robert", "Henry Ford"];
  const req = new GreetRequest();
  const call = client.greetEveryone(req, (err, res) => {
    if (err) {
      return console.log(err);
    }
  });
  names
    .map((name) => new GreetRequest().setFirstName(name))
    .forEach((req) => call.write(req));

  call.on("data", (res) => {
    console.log(`Res sent successfully ${res.getResult()}`);
  });

  call.end();
}

function main() {
  // Accept connections without TLS encryption or authentication. In simple terms: No HTTPS, No certificates, Plain HTTP/2
  const creds = grpc.credentials.createInsecure();
  // Takes address of sever.
  const client = new GreetServiceClient("localhost:5001", creds);
  //greetOnce(client);
  //greetManyTimes(client);
  // longGreet(client);
  greetEveryone(client);
}

main();
