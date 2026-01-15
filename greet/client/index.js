const grpc = require("@grpc/grpc-js");
const { GreetServiceClient } = require("./../proto/greet_grpc_pb");

function main() {
  // Accept connections without TLS encryption or authentication. In simple terms: No HTTPS, No certificates, Plain HTTP/2
  const creds = grpc.ServerCredentials.createInsecure();
  // Takes address of sever.
  const client = new GreetServiceClient("localhost:5001", creds);

  // After doing some operations we close the client
  client.close();
}

main();
