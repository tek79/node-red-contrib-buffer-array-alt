module.exports = function(RED) {

  function BufferArray(config) {

    RED.nodes.createNode(this,config);

    const node = this;
    const bufferLen = parseInt(config.bufferLen) || 10;
    let output = false;

    node.on('input', function(msg) {

      let bufferArray = output ||
          (() => {
            let ret = [];
            for (let i = 0; i < bufferLen; i++) {
              ret.unshift(0);
            }
            return ret;
          })();

      bufferArray.pop();
      bufferArray.unshift(msg.payload);
      output = bufferArray;

      msg.payload = output;
      node.send(msg);

    });
  }

  RED.nodes.registerType('buffer-array', BufferArray);
};
