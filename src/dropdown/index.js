import {engine, extend} from '../utils'
;(function(engine, extend){
  "use strict";
  function DropDown() {

  }
  DropDown.prototype = {
    constructor: DropDown
  }
  if(typeof module !='undefined' && module.exports) {
    module.exports = DropDown;
  }else if(typeof define == 'function' && define.amd) {
    define(function() {
      return DropDown;
    })
  }else {
    var global = (function(){
      return this || (0, eval)('this');
    })
    !('DropDown' in global) && (global.DropDown = DropDown);
  }
}(engine,extend))