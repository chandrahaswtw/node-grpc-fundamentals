/*
NOTES: If we see proto we see as below:

Request:
message GreetRequest{
    string first_name = 1;
}

Request comes from client: first_name becomes 
- setFirstName() for client to set the first_name. 
- getFirstName() on server to read the same.



Response:
message GreetResponse {
    string result = 1;
}

Since response comes from server, result becomes 
- setResult() for server to set the result. 
- getResult() for client to recieve the response.


service GreetService{
    rpc Greet (GreetRequest) returns (GreetResponse);
}

We have the implementations of GreetServiceService and GreetServiceClient.

greet_pb.js --> Contains stuff about the requests and response
greet_pb.js --> Contains stuff about the GreetServiceService and GreetServiceClient.

We've used the .greet function here. This should align with the .proto implementation. We've used the rpc Greet here and hence the function name must be greet in lowercase.

service GreetService{
    rpc Greet (GreetRequest) returns (GreetResponse);
}

*/

const { GreetResponse } = require("./../proto/greet_pb");

exports.greet = (call, callback) => {
  console.log("Greet - server");
  const res = new GreetResponse().setResult(
    `Hello ${call.request.getFirstName()}`
  );

  //Null for error
  callback(null, res);
};
