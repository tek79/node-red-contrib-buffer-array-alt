module.exports = function(RED) {

  function BufferArray(config) {

    RED.nodes.createNode(this,config);

    const node = this;
    const bufferLen = parseInt(config.bufferLen) || 10;
    let output = false;
    let bufferArray = [];
    node.on('input', function(msg) {

      bufferArray.unshift(msg.payload);
      let curLength = bufferArray.length;

      while(curLength > bufferLen) {
        bufferArray.pop();
        curLength = bufferArray.length;
      }

      output = bufferArray;
      msg.payload = output;
      node.send(msg);

    });
  }

  RED.nodes.registerType('buffer-array-alt', BufferArray);
};
