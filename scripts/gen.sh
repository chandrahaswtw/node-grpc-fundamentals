#!/bin/bash

argc=$#
argv=("$@")

for (( j = 0; j < argc; ++j )); do
  PROJECT=${argv[j]}
  PROTO_DIR="$PROJECT/proto"
  MAIN_PROTO="$PROTO_DIR/$PROJECT.proto"

  echo "Processing project: $PROJECT"

  # 1. Generate gRPC and Protobuf code for the main file (e.g., greet.proto)
  if [ -f "$MAIN_PROTO" ]; then
    ./node_modules/.bin/grpc_tools_node_protoc \
      -I "$PROTO_DIR" \
      --js_out="import_style=commonjs:$PROTO_DIR" \
      --grpc_out="grpc_js:$PROTO_DIR" \
      "$MAIN_PROTO"
  else
    echo "Warning: Main proto file $MAIN_PROTO not found."
  fi

  # 2. Generate Protobuf code for all OTHER .proto files in that directory
  # We use 'find' but ensure we don't include the main one again
  OTHER_FILES=$(find "$PROTO_DIR" -type f -name "*.proto" ! -path "$MAIN_PROTO")
  
  if [ -n "$OTHER_FILES" ]; then
    ./node_modules/.bin/grpc_tools_node_protoc \
      -I "$PROTO_DIR" \
      --js_out="import_style=commonjs:$PROTO_DIR" \
      $OTHER_FILES
  fi
done