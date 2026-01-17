const grpc = require("@grpc/grpc-js");
const { sum } = require("./sumImpl");
const { prime } = require("./primeImpl");
const { avg } = require("./avgImpl");
const { CalculatorServiceService } = require("./../proto/calculator_grpc_pb");

const addr = "localhost:5001";

function cleanup(server) {
  console.log("Cleanup");
  server && server.forceShutdown();
  process.exit(0);
}

function main() {
  const server = new grpc.Server();

  // Accept connections without TLS encryption or authentication. In simple terms: No HTTPS, No certificates, Plain HTTP/2
  const creds = grpc.ServerCredentials.createInsecure();

  // Listens to ctrl+c
  process.on("SIGINT", () => {
    console.log("Caught interrupt signal");
    cleanup();
  });

  server.addService(CalculatorServiceService, { sum, prime, avg });

  server.bindAsync(addr, creds, (err, _) => {
    if (err) {
      return cleanup(server);
    }
    console.log(`Listening on ${addr}`);
  });
}

main();
