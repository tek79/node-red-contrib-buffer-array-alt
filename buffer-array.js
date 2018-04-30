module.exports = function(RED) {

  function BufferArray(config) {

    RED.nodes.createNode(this,config);

    const node = this;
    const bufferLen = parseInt(config.bufferLen) || 6;
    let waitCount = (config.startWhenFilled) ? bufferLen-1 : 0;
    let output = false;

    node.on('input', function(msg) {

      let bufferArray = output ||
          (() => {
            let ret = [];
            for (let i = 0; i < bufferLen; i++) {
              ret.push(0);
            }
            return ret;
          })();

      bufferArray.shift();
      bufferArray.push(msg.payload);
      output = bufferArray;

      if (waitCount > 0) {
        this.status({fill:"yellow",shape:"ring",text:`waiting ${waitCount}`});
        waitCount--;
      } else {
        this.status({});
        msg.payload = output;
        node.send(msg);
      }

    });
  }

  RED.nodes.registerType('buffer-array', BufferArray);
};
