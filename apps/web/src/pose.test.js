import test from 'node:test';import assert from 'node:assert/strict';import{angleDegrees,movementMeasurement,countRepetitions}from'./pose.js';
test('angle calculation returns a right angle',()=>assert.equal(angleDegrees({x:1,y:0},{x:0,y:0},{x:0,y:1}),90));
test('degenerate landmarks are rejected',()=>assert.equal(angleDegrees({x:0,y:0},{x:0,y:0},{x:1,y:1}),null));
test('low confidence landmarks do not produce measurements',()=>{const l=Array.from({length:33},()=>({x:0,y:0,visibility:1}));l[11]={x:0,y:0,visibility:.2};assert.equal(movementMeasurement(l,'elbow-flexion'),null)});
test('unknown exercises are rejected',()=>assert.equal(movementMeasurement([], 'unknown'),null));
test('repetitions require low and high thresholds',()=>assert.equal(countRepetitions([160,120,60,70,130,155,60,150]),2));
