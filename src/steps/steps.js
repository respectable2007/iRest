import { templateEngine } from '../utils/templateEngine.js';
(function(templateEngine) {
  "use strict";
  var _global;
  // 工具函数
    // 对象合并
    function extend(o,n,override) {
        for(var key in n){
            if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
                o[key]=n[key];
            }
        }
        return o;
    }
    // 通过class查找dom
    if(!('getElementsByClass' in HTMLElement)){
        HTMLElement.prototype.getElementsByClass = function(n){
            var el = [],
                _el = this.getElementsByTagName('*');
            for (var i=0; i<_el.length; i++ ) {
                if (!!_el[i].className && (typeof _el[i].className == 'string') && _el[i].className.indexOf(n) > -1 ) {
                    el[el.length] = _el[i];
                }
            }
            return el;
        };
        ((typeof HTMLDocument !== 'undefined') ? HTMLDocument : Document).prototype.getElementsByClass = HTMLElement.prototype.getElementsByClass;
    }
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
      return templateEngine(tplStr, data);
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
})(templateEngine)