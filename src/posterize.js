/**
  ## posterize method
  posterize given image

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object
        - level `Number` : posterize level, from 2 - 256

  ### Example
      var input = { data: Uint8ClampedArray[400], width: 10, height: 10 }
      // posterlize in 4 levels
      grafi.posterize(input, {level: 4})
 */
function posterize (imgData, option) {
  // make sure data is good data
  checkColorDepth(imgData)

  // check options object & set default variables
  option = option || {}
  option.level = option.level || 4

  var pixelSize = imgData.width * imgData.height
  var newPixelData = new Uint8ClampedArray(pixelSize * 4)

  var lookupTable = new Uint8Array(256)
  var colorSize = 256 / (option.level - 1)
  var stepSize = 256 / option.level
  var level, step, levelindex, pixel, index

  for (level = 0; level < option.level; level++) {
    for (step = 0; step < stepSize; step++) {
      levelindex = Math.round(level * stepSize + step)
      if (level === option.level - 1) {
        lookupTable[levelindex] = 255
        continue
      }
      lookupTable[levelindex] = level * colorSize
    }
  }

  for (pixel = 0; pixel < pixelSize; pixel++) {
    index = pixel * 4
    newPixelData[index] = lookupTable[imgData.data[index]]
    newPixelData[index + 1] = lookupTable[imgData.data[index + 1]]
    newPixelData[index + 2] = lookupTable[imgData.data[index + 2]]
    newPixelData[index + 3] = imgData.data[index + 3]
  }

  return formatter(newPixelData, imgData.width, imgData.height)
}
