import { engine, extend } from '../utils/index.js';
(function(engine, extend) {
  "use strict";
  function Steps(opt) {
    this._init(opt)
  }
  Steps.prototype = {
    constructor: Steps,
    _init: function(opt) {
      var defaults = {
        active: 0,
        tmpId: 'steps',
        activeCls: 'step-active',
        template: '<script type="text/template" id="steps"><div class="steps"><ul></ul><div><button id="statusChange">下一步</button></div></div></script>'
      }
      this.defaults = extend(defaults, opt, true);
      this._initTemplate();
      this.tpl = engine(this.defaults.template.trim(), this.defaults);
      this.dom = this._parseToDom(this.tpl);
      document.body.appendChild(this.dom[0]);
      this._bindEvent();
    },
    _initTemplate: function() {
      var lens = this.defaults.titles.length,
          ts = this.defaults.titles,
          t = this.defaults.template,
          s = '<ul>';
      for(var i = 0; i < lens; i++) {
        s += '<li>' + ts[i] + '</li>'
      }
      s+='</ul>';
      t = t.replace(/<ul>.*<\/ul>/gi, s);
      this.defaults.template = t;
    },
    _parseToDom:function(str) {
      var div = document.createElement('div');
      if(typeof str === 'string') {
        div.innerHTML = str;
      }
      div.getElementsByTagName('li')[this.defaults.active].className = this.defaults.activeCls;
      return div.childNodes;
    },
    _bindEvent:function(){
      var that = this;
      document.getElementById('statusChange').addEventListener('click', function() {
        var index = ++that.defaults.active,
            steps = document.getElementsByClassName('steps')[0],
            lis = steps.getElementsByTagName('li');
        for(var i = 0, lens = lis.length; i < lens; i++) {
            lis[i].className = '';
        }
        if(typeof lis[index] !== 'undefined') {
          lis[index].className = that.defaults.activeCls;
        }else{
          that.defaults.active = 0;
          lis[0].className = that.defaults.activeCls;
        }
      },false)
    }
  }
  var _global = (function(){
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