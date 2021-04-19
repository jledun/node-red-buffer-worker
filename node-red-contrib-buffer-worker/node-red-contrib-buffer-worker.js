const bufferWorker = require("io-buffer-worker");

module.exports = (RED) => {

  function encodeNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on('input', async (msg, send, done) => {

      send = send || function() { node.send.apply(node, arguments); }
      const endianness = config.endianness || "BE";

      try{
        const result = await bufferWorker.encode(JSON.parse(config.description), msg.payload, {endianness: endianness});
        msg.payload = result;
        send(msg);
        if (done) done();

      }catch(e){
        if (done) {
          done(e);
        }else{
          node.error(e, msg);
        }
      }

    });
  }

  function decodeNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on('input', async (msg, send, done) => {

      send = send || function() { node.send.apply(node, arguments); }
      const endianness = config.endianness || "BE";

      try{
        const result = await bufferWorker.decode(JSON.parse(config.description), msg.payload, {endianness: endianness});
        msg.payload = result;
        send(msg);
        if (done) done();

      }catch(e){
        if (done) {
          done(e);
        }else{
          node.error(e, msg);
        }
      }

    });
  }

  RED.nodes.registerType("encode-buffer", encodeNode);
  RED.nodes.registerType("decode-buffer", decodeNode);

}

