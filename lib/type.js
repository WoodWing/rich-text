var Delta = require('quill-delta');


module.exports = {
  Delta: Delta,
  type: {
    name: 'rich-text',
    uri: 'http://sharejs.org/types/rich-text/v1',

    create: function (ops) {
      return ops;
    },

    apply: function (snapshot, delta) {
      snapshot = new Delta(snapshot);
      delta = new Delta(delta);
      return snapshot.compose(delta).ops;
    },

    compose: function (delta1, delta2) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      return delta1.compose(delta2).ops;
    },

    diff: function (delta1, delta2) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      return delta1.diff(delta2).ops;
    },

    transform: function (delta1, delta2, side) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      // Fuzzer specs is in opposite order of delta interface
      return delta2.transform(delta1, side === 'left').ops;
    },

    transformCursor: function(cursor, delta, isOwnOp) {
      return delta.transformPosition(cursor, !isOwnOp);
    },

    normalize: function(ops) {
      return ops;   // quill-delta is already canonical
    },

    serialize: function(ops) {
      return ops;
    },

    deserialize: function(ops) {
      return ops;
    }
  }
};
