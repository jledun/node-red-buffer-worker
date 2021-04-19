const bufferWorker = require("io-buffer-worker");

module.exports = (RED) => {

  const encodeNode = (config) => {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on('input', (msg) => {
      return msg;
    });
  }

  const decodeNode = (config) => {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on('input', (msg) => {
      return msg;
    });
  }

  RED.nodes.registerType("encode-buffer", encodeNode);
  RED.nodes.registerType("decode-buffer", decodeNode);

}

