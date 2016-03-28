;(function(){

import '../node_modules/grafi-formatter/src/formatter'
import 'posterize'

  var grafi = {}
  grafi.posterize = posterize

  if (typeof module === 'object' && module.exports) {
    module.exports = grafi
  } else {
    this.grafi = grafi
  }
}())
