/*
NOTES: If we see proto we see as below:

-----------------
After compilation
-----------------

greet_grpc_pb.js --> Contains stuff about the requests and response.
greet_pb.js --> Contains stuff about the GreetServiceService and GreetServiceClient.

--------
Request:
--------

message GreetRequest{
    string first_name = 1;
}

Request comes from client: first_name becomes 
- setFirstName() for client to set the first_name. 
- getFirstName() on server to read the same.

---------
Response:
---------

message GreetResponse {
    string result = 1;
}

Since response comes from server, result becomes 
- setResult() for server to set the result. 
- getResult() for client to recieve the response.

-------
Service
-------

service GreetService{
    rpc Greet (GreetRequest) returns (GreetResponse);
}

We have the implementations of GreetServiceService and GreetServiceClient.

We’ve used the exports.greet function on the server. This must align with the .proto service definition. Since the RPC is defined as Greet in the proto file, the corresponding handler function in Node.js must be named greet (lowercase).
On the client side, the same RPC is invoked using client.greet(...).

*/

const { GreetResponse, Lo } = require("./../proto/greet_pb");

// Unary API's we can use the

exports.greet = (call, callback) => {
  console.log("Unary server");

  const res = new GreetResponse().setResult(
    `Hello ${call.request.getFirstName()}`
  );

  //Null for error
  callback(null, res);
};

// Server streaming
// We've used call instead of calling callback as we done for unary API's
exports.greetManyTimes = (call, _) => {
  console.log("Server streaming");

  for (let i = 0; i < 10; i++) {
    const res = new GreetResponse();
    res.setResult(`Hey ${call.request.getFirstName()}, this is ${i}`);
    call.write(res);
  }

  call.end();
};

//Client streaming
// Using call.on data and end events to catch the data.
exports.longGreet = (call, callback) => {
  console.log("Client streaming");

  let greet = "";

  call.on("data", (req) => {
    greet += `Hello ${req.getFirstName()} \n`;
  });

  call.on("end", (req) => {
    const res = new GreetResponse();
    res.setResult(greet);
    callback(null, res);
  });
};
