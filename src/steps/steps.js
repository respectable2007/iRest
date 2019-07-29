import { engine, extend } from '../utils/index.js';
(function(engine, extend) {
  "use strict";
  var _global;
  function Steps(opt) {
    this._init(opt)
  }
  Steps.prototype = {
    constructor: Steps,
    _init: function(opt) {
      var defaults = {
        active: 0,
        tmpId: null
      }
      this.defaults = extend(defaults, opt, true);
      this.tpl = this._parseTpl(this.defaults.tmpId);
      this.dom = this._parseToDom(this.tpl);
      document.body.appendChild(this.dom[0]);
    },
    _parseTpl:function(id) {
      var data = this.defaults;
      var tplStr = document.getElementById(id).innerHTML.trim();
      return engine(tplStr, data);
    },
    _parseToDom:function(str) {
      var div = document.createElement('div');
      if(typeof str === 'string') {
        div.innerHTML = str;
      }
      div.getElementsByTagName('li')[this.defaults.active].className = 'active';
      return div.childNodes;
    }
  }
  _global = (function(){
    return this || (0, eval)('this');
  }());
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = Steps;
  } else if(typeof define === 'function' && define.amd) {
    define(function(){
      return Steps;
    })
  } else {
    !('Steps' in _global) && (_global.Steps = Steps);
  }
})(engine, extend)