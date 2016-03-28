/**
  ## posterize method
  Brief description

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object

  ### Example
      //code sample goes here
 */
function posterize (imgData, option) {
  // check options object & set default variables
  option = option || {}
  option.monochrome = option.monochrome || false
  option.tone = option.tone || 4

  // Check length of data & avilable pixel size to make sure data is good data
  var pixelSize = imgData.width * imgData.height
  var dataLength = imgData.data.length
  var colorDepth = dataLength / pixelSize
  if (colorDepth !== 4 && colorDepth !== 1) {
    throw new Error('ImageObject has incorrect color depth')
  }

  var newPixelData = new Uint8ClampedArray(pixelSize * (option.monochrome || 4))

  var lookupTable = new Uint8Array(256)
  var colorSize = 256 / (option.tone - 1)
  var stepSize = 256 / option.tone
  var l, r, p, _i, _data

  for (l = 0; l < option.tone; l++) {
    for (i = 0; i < stepSize; i++) {
      if (l === 3) {
        lookupTable[l * stepSize + i] = 255
        continue
      }
      lookupTable[l * stepSize + i] = l * colorSize
    }
  }
  console.log(lookupTable)

  for (p = 0; p < pixelSize; p++) {
    if (colorDepth === 1) {
      _data = lookupTable[imgData.data[p]]
      // case 1. input is 1 channel and output should be 1 channel (monochrome)
      if (option.monochrome) {
        newPixelData[p] = _data
        continue
      }
      // case 2. input is 1 channel but output should be RGBA
      newPixelData[_i] = _data
      newPixelData[_i + 1] = _data
      newPixelData[_i + 2] = _data
      newPixelData[_i + 3] = 255
      continue
    }

    // case 3. input is RGBA  and output should also be RGBA
    _i = p * 4
    newPixelData[_i] = lookupTable[imgData.data[_i]]
    newPixelData[_i + 1] = lookupTable[imgData.data[_i + 1]]
    newPixelData[_i + 2] = lookupTable[imgData.data[_i + 2]]
    newPixelData[_i + 3] = imgData.data[_i + 3]
  }

  return formatter(newPixelData, imgData.width, imgData.height)
}
