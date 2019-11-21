# node-red-contrib-buffer-array-alt
Node-RED node to fill a circular buffer array.

This node fills an array with payload values and begins discarding the oldest payload values once a 
user-defined maximum length has been reached.

## Installation

This package uses ES2015 code. Use at least version 6.4.0 of
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
[{"id":"9ce61a39.6291b8","type":"debug","z":"54a522d6.6258fc","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","x":570,"y":160,"wires":[]},{"id":"b09dc804.0f8538","type":"inject","z":"54a522d6.6258fc","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":220,"y":160,"wires":[["15aa0be1.792c14"]]},{"id":"15aa0be1.792c14","type":"buffer-array-alt","z":"54a522d6.6258fc","name":"","bufferLen":10,"x":400,"y":160,"wires":[["9ce61a39.6291b8"]]}]
```
