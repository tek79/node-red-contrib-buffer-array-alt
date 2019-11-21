# node-red-contrib-buffer-array-alt
Node-RED node to fill a circular buffer array.

This node fills an array with payload values and begins discarding the oldest payload values once a 
user-definned maximum has been reached.

## Installation

This package uses ES2015 code. Therefore use at least version 6.4.0 of
[Node.js](https://nodejs.org/).

This package is a node for Node-RED.
[Install Node-RED](https://nodered.org/docs/getting-started/installation)


## Nodes

### buffer-array

**Input**

***payload*** *any*

**Output**

***payload*** *array*

A circular array of user-defined maximum length containing a collection of payloads (added from left to right).

**Details**

The input payload will be added to the beginning of the output array. The array has a variable length with a
user-defined maximum. The first item is the newest value and the last one is the oldest.

## Flows

Example flow:

```json
[{"id":"feddb213.294f9","type":"buffer-array","z":"cc8d16aa.a75d28","name":"","bufferLen":"5","startWhenFilled":false,"x":490,"y":160,"wires":[["537c7a24.a841a4","7ccad598.17429c"]]},{"id":"1468aa76.c77d06","type":"random","z":"cc8d16aa.a75d28","name":"","low":"1","high":"10","inte":"true","property":"payload","x":300,"y":160,"wires":[["feddb213.294f9"]]},{"id":"a9da101a.14cf9","type":"inject","z":"cc8d16aa.a75d28","name":"","topic":"test","payload":"Hello!","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":220,"wires":[["feddb213.294f9"]]},{"id":"537c7a24.a841a4","type":"debug","z":"cc8d16aa.a75d28","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":670,"y":160,"wires":[]},{"id":"7ccad598.17429c","type":"change","z":"cc8d16aa.a75d28","name":"Get Average","rules":[{"t":"set","p":"payload","pt":"msg","to":"$average(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":670,"y":200,"wires":[["58fb2cf.d406ad4"]]},{"id":"7ec722b3.ebeedc","type":"inject","z":"cc8d16aa.a75d28","name":"","topic":"random","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":160,"wires":[["1468aa76.c77d06"]]},{"id":"58fb2cf.d406ad4","type":"debug","z":"cc8d16aa.a75d28","name":"","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":830,"y":200,"wires":[]}]
```
