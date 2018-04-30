const should = require("should");
const helper = require("../node_modules/node-red-node-test-helper");
const bufferArrayNode = require("../buffer-array.js");

describe('buffer-array Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    const flow = [{ id: "n1", type: "buffer-array", name: "test name" }];
    helper.load(bufferArrayNode, flow, function () {
      const n1 = helper.getNode("n1");
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  it('should add payload to last item of ring buffer array', function(done) {
    const flow= [
        { id: 'n1', type: 'buffer-array', name: 'test name', bufferLen: 6, wires: [['n2']] },
        { id: 'n2', type: 'helper' }
      ];
    helper.load(bufferArrayNode, flow, function() {
      const n2 = helper.getNode('n2');
      const n1 = helper.getNode('n1');
      n2.on('input', function (msg) {
        try {
          msg.should.have.property('payload', [0, 0, 0, 0, 0, 123]).which.is.a.Array();
          done();
        } catch(err) {
          done(err);
        }
      });
      n1.receive({ payload: 123 });
    });
  });

  it('should add payload to last item of ring buffer array and shift the former last item one step to the left', function(done) {
    const flow= [
        { id: 'n1', type: 'buffer-array', name: 'test name', bufferLen: 6, wires: [['n2']] },
        { id: 'n2', type: 'helper' }
      ];
    helper.load(bufferArrayNode, flow, function() {
      const n2 = helper.getNode('n2');
      const n1 = helper.getNode('n1');
      let c = 0;
      n2.on('input', function (msg) {
        try {
          if (c === 0) {
            msg.should.have.property('payload', [0, 0, 0, 0, 0, 123]).which.is.a.Array();
            c++;
          } else {
            msg.should.have.property('payload', [0, 0, 0, 0, 123, 456]).which.is.a.Array();
            done();
          }
        } catch(err) {
          done(err);
        }
      });
      n1.receive({ payload: 123 });
      n1.receive({ payload: 456 });
    });
  });

  it('should set payload into array of one, if array length is set to one', function(done) {
    const flow= [
        { id: 'n1', type: 'buffer-array', name: 'test name', bufferLen: 1, wires: [['n2']] },
        { id: 'n2', type: 'helper' }
      ];
    helper.load(bufferArrayNode, flow, function() {
      const n2 = helper.getNode('n2');
      const n1 = helper.getNode('n1');
      let c = 0;
      n2.on('input', function (msg) {
        try {
          if (c === 0) {
            msg.should.have.property('payload', [123]).which.is.a.Array();
            c++;
          } else {
            msg.should.have.property('payload', [456]).which.is.a.Array();
            done();
          }
        } catch(err) {
          done(err);
        }
      });
      n1.receive({ payload: 123 });
      n1.receive({ payload: 456 });
    });
  });

  it('should start output when buffer filled', function(done) {
    const flow= [
        { id: 'n1', type: 'buffer-array', name: 'test name', bufferLen: 3, startWhenFilled: true, wires: [['n2']] },
        { id: 'n2', type: 'helper' }
      ];
    helper.load(bufferArrayNode, flow, function() {
      const n2 = helper.getNode('n2');
      const n1 = helper.getNode('n1');
      n2.on('input', function (msg) {
        try {
          // todo: check of n1 not to send anything ...
          msg.should.have.property('payload', [123, 456, 789]).which.is.a.Array();
          done();
        } catch(err) {
          done(err);
        }
      });
      n1.receive({ payload: 123 });
      n1.receive({ payload: 456 });
      n1.receive({ payload: 789 });
    });
  });

});
