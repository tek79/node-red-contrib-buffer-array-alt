# node-red-contrib-buffer-array
Node-RED node to fill an buffer array.

This node fills an array of a given length with payload values.

## Motivation

Sometimes, it's helpful to buffer some values of a sensor payload stream. This could be the case, if your output device is slower than your sensor data input stream. If you don't want to miss values in between the velocity
gap of input and output devices you are able to use the value buffer to calculate the average of the last few
values.


## Installation

This package uses ES2015 code. Therefore use at least version 6.4.0 of
[Node.js](https://nodejs.org/).

This package is a node for Node-RED.
[Install Node-RED](https://nodered.org/docs/getting-started/installation)

Install this package:
```
npm install node-red-contrib-buffer-array
```

... or use the palette manager of the Node-RED ui.


## Nodes

### buffer-array

**Input**

***payload*** *any*

**Output**

***payload*** *array*

the buffer array of a given length containing the last payloads added from the tail (right to left).

**Details**

The input payload will be added at the last position of the output array. The array has a defined length of
items. The first item is the oldest value and the last the newest.

If you use numeric values, you are able to get the average value of the last few payloads. To get the average
value, you might attach a standard **change node** to set a variable with the expression `$average(payload)`.
Of course you might use other expressions like `$max(payload)` to get the maximum value of the last
payloads, etc.

## Flows

Example flow:

```json
[{"id":"7ec722b3.ebeedc","type":"inject","z":"cc8d16aa.a75d28","name":"","topic":"random","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":160,"wires":[["1468aa76.c77d06"]]},{"id":"537c7a24.a841a4","type":"debug","z":"cc8d16aa.a75d28","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":650,"y":160,"wires":[]},{"id":"1468aa76.c77d06","type":"random","z":"cc8d16aa.a75d28","name":"","low":"1","high":"10","inte":"true","property":"payload","x":300,"y":160,"wires":[["feddb213.294f9"]]},{"id":"a9da101a.14cf9","type":"inject","z":"cc8d16aa.a75d28","name":"","topic":"test","payload":"Hello!","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":220,"wires":[["feddb213.294f9"]]},{"id":"feddb213.294f9","type":"buffer-array","z":"cc8d16aa.a75d28","name":"","bufferLen":6,"x":490,"y":160,"wires":[["537c7a24.a841a4"]]}]
```
