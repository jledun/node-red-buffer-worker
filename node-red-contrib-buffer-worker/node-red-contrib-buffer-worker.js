const bufferWorker = require("io-buffer-worker");

module.exports = (RED) => {

  function bufferToArrayOfValue(buf, config) {
    if (!buf) return [];
    let tmp = [];
    let i = 0;
    let val1 = 0;
    let val2 = 0;
    const reverse = config.arrayLE || false;
    do{
      if (reverse) {
        val1 = (i < buf.length) ? buf[i] : 0;
        val2 = (i + 1 < buf.length) ? buf[i + 1] : 0;
      }else{
        val1 = (i + 1 < buf.length) ? buf[i + 1] : 0;
        val2 = (i < buf.length) ? buf[i] : 0;
      }
      tmp.push(val1 * 0x100 + val2);
      i = i + 2;
    }while (i < buf.length);
    return tmp;
  }

  function encodeNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on('input', async (msg, send, done) => {

      send = send || function() { node.send.apply(node, arguments); }
      const endianness = config.endianness || "BE";
      const modbusWrite = config.valueArray || false;

      try{
        const result = await bufferWorker.encode(JSON.parse(config.description), msg.payload, {endianness: endianness});
        msg.payload = (modbusWrite) ? bufferToArrayOfValue(result, config) : result;
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
      const inputField = config.inputField || "payload";
      const buffer = inputField.split(".").reduce((acc, st) => acc[st], msg);
      if (typeof buffer === "undefined") {
        const e = new Error(`Le champ msg.${inputField} n'existe pas.`);
        if (done) {
          done(e);
        }else{
          node.error(e, msg);
        }
        return;
      }

      try{
        const result = await bufferWorker.decode(JSON.parse(config.description), buffer, {endianness: endianness});
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

