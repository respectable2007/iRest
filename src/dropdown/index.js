import {engine, extend} from '../utils'
;(function(engine, extend){
  "use strict";
  function DropDown(opt) {
    this._init(opt);
  }
  DropDown.prototype = {
    constructor: DropDown,
    default: {
      template: '<script type="text/template" id="dropdown"><div class="ir-dropdown">'
      +'<div class="ir-dropdown-header">下拉菜单</div>'
      +'<div class="ir-dropdown-list"><ul>条目</ul></div>'
      +'</div></script>'
    },
    _init: function(opt) {
      this.default = extend(this.default, opt);
      this._initTemplate();
      this.tpl = engine(this.default.template.trim(), this.default);
      this.dom = this._parseToDom(this.tpl);
      document.body.appendChild(this.dom);
    },
    _initTemplate: function() {
      let {header, item, template} = this.default,
          lens = item.length,
          i = 0,
          iStr = '';
      if (header) {
        template = template.replace(/下拉菜单/gi, header);
      }
      if (lens > 0) {
        for(i; i < lens; i++) {
          iStr += '<li>' + item[i] + '</li>'
        }
      }
      template = template.replace(/条目/gi, iStr);
      this.default.template = template;
    },
    _parseToDom: function(str) {
      let div = document.createElement('div');
      if(typeof str === 'string') {
        div.innerHTML = str;
      }
      return div.childNodes[0];
    }
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
    }());
    !('DropDown' in global) && (global.DropDown = DropDown);
  }
}(engine,extend))