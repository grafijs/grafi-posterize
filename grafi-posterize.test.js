var assert = require('assert')
var grafi = require('./grafi-posterize.js')

var imageData = grafi.posterize({data: [255, 255, 255, 255, 127, 127, 127, 127], width: 1, height: 2})

assert(imageData.constructor.toString().match(/function\s(\w*)/)[1] === 'GrafiImageData',
  'returned object is an instance of GrafiImageData')

assert(imageData.data[0] === 255, 'R channel for 1st pixel stay 255')
assert(imageData.data[1] === 255, 'G channel for 1st pixel stay 255')
assert(imageData.data[2] === 255, 'B channel for 1st pixel stay 255')
assert(imageData.data[4] === 85, 'R channel for 2nd pixel change to 85')
assert(imageData.data[5] === 85, 'G channel for 2nd pixel change to 85')
assert(imageData.data[6] === 85, 'B channel for 2nd pixel change to 85')
assert(imageData.data[7] === 127, 'Alpha channel is not altered')