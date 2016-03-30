;(function () {
  /**
    ## ImageData object constructor
    Every return from grafi method is formatted to an ImageData object.
    This constructor is used when `window` is not available.
   */
  function ImageData (pixelData, width, height) {
    this.width = width
    this.height = height
    this.data = pixelData
  }

  /**
    ## formatter
    Internal function used to format pixel data into ImageData object

    ### Parameters
      - pixelData `Uint8ClampedArray`: pixel representation of the image
      - width `Number`: width of the image
      - hight `Number`: height of the image

    ### Example
        formatter(new Uint8ClampedArray[400], 10, 10)
        // ImageData { data: Uint8ClampedArray[400], width: 10, height: 10, }
   */
  function formatter (pixelData, width, height) {
    var colorDepth = pixelData.length / (width * height)

    // Length of pixelData must be multipul of available pixels (width * height).
    // Maximum color depth allowed is 4 (RGBA)
    if (Math.round(colorDepth) !== colorDepth || colorDepth > 4) {
      throw new Error('data and size of the image does now match')
    }

    if (!(pixelData instanceof Uint8ClampedArray)) {
      throw new Error('pixel data passed is not an Uint8ClampedArray')
    }

    // If window is avilable create ImageData using browser API,
    // otherwise call ImageData constructor
    if (typeof window === 'object' && colorDepth === 4) {
      return new window.ImageData(pixelData, width, height)
    }
    return new ImageData(pixelData, width, height)
  }
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
    option.level = option.level || 4

    // Check length of data & avilable pixel size to make sure data is good data
    var pixelSize = imgData.width * imgData.height
    var dataLength = imgData.data.length
    var colorDepth = dataLength / pixelSize
    if (colorDepth !== 4 && colorDepth !== 1) {
      throw new Error('ImageObject has incorrect color depth')
    }

    var newPixelData = new Uint8ClampedArray(pixelSize * (option.monochrome || 4))

    var lookupTable = new Uint8Array(256)
    var colorSize = 256 / (option.level - 1) // 23
    var stepSize = 256 / option.level // 21
    var l, _li, r, p, _i, _data

    for (l = 0; l < option.level; l++) {
      for (s = 0; s < stepSize; s++) {
        _li = Math.round(l * stepSize + s)
        if (l === option.level - 1) {
          lookupTable[_li] = 255
          continue
        }
        lookupTable[_li] = l * colorSize
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

  var grafi = {}
  grafi.posterize = posterize

  if (typeof module === 'object' && module.exports) {
    module.exports = grafi
  } else {
    this.grafi = grafi
  }
}())
