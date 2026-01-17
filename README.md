# gRPC with Node.js (JavaScript)

This repository demonstrates how to build **gRPC services in Node.js** using JavaScript.
It includes working examples of all four gRPC communication patterns:

* Unary RPC
* Server Streaming RPC
* Client Streaming RPC
* Bidirectional Streaming RPC

The project uses the official **@grpc/grpc-js** implementation and **Protocol Buffers**.

---

## Tech Stack

* **Node.js**
* **gRPC** (`@grpc/grpc-js`)
* **Protocol Buffers** (`google-protobuf`)
* **grpc-tools** (for code generation)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <repo-name>
npm install
```

### Dependencies Used

```bash
npm install @grpc/grpc-js google-protobuf --save
npm install grpc-tools --save-dev
```
---

## Protocol Buffers

All gRPC contracts are defined in the `proto/` directory using **proto3** syntax.

Example:

```proto
syntax = "proto3";

package greet;

service GreetService {
  rpc Greet (GreetRequest) returns (GreetResponse);
  rpc GreetManyTimes (GreetRequest) returns (stream GreetResponse);
  rpc LongGreet (stream GreetRequest) returns (GreetResponse);
  rpc GreetEveryone (stream GreetRequest) returns (stream GreetResponse);
}

message GreetRequest {
  string first_name = 1;
}

message GreetResponse {
  string result = 1;
}
```

---

## Generating gRPC Code

Use the provided script to generate JS stubs from `.proto` files:

```bash
npm run pb:gen
```

This internally uses `grpc-tools` to generate:

* `_pb.js` (protobuf messages)
* `_grpc_pb.js` (gRPC service definitions)

---

## Running the Server

```bash
node server/index.js
```

The server starts on:

```text
localhost:5001
```

---

## Running the Client

In a separate terminal:

```bash
node client/index.js
```

You can enable or disable specific RPC calls inside the client to test each communication pattern.

---

## gRPC Communication Patterns

### 1. Unary RPC

Single request → single response.

**Use case:** Traditional request-response APIs.

---

### 2. Server Streaming RPC

Single request → stream of responses.

**Use case:** Notifications, progress updates.

---

### 3. Client Streaming RPC

Stream of requests → single response.

**Use case:** Batch uploads, log streaming.

---

### 4. Bidirectional Streaming RPC

Stream of requests ↔ stream of responses.

**Use case:** Chat applications, real-time collaboration.

---

## Notes

* Uses **insecure credentials** for simplicity (no TLS).
* Designed for learning and experimentation.
* Compatible with **Node.js 16+**.

---

## References

- [gRPC Official Website](https://grpc.io/)
- [Introduction to gRPC](https://grpc.io/docs/what-is-grpc/introduction/)
- [gRPC Basics Tutorial (Node.js)](https://grpc.io/docs/languages/node/basics/)
- [@grpc/grpc-js on npm](https://www.npmjs.com/package/@grpc/grpc-js)
- [Protocol Buffers Official Site](https://protobuf.dev/)
- [Protocol Buffers Language Guide (proto3)](https://protobuf.dev/programming-guides/proto3/)
---