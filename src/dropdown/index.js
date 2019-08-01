import {engine, extend, toRawType} from '../utils'
;(function(engine, extend, toRawType){
  "use strict";
  function DropDown(opt) {
    this._init(opt);
  }
  DropDown.prototype = {
    constructor: DropDown,
    default: {
      trigger: 'hover',
      template: '<script type="text/template" id="dropdown"><div class="ir-dropdown">'
      +'<div class="ir-dropdown-header">下拉菜单</div>'
      +'<div class="ir-dropdown-list hide"><ul>条目</ul></div>'
      +'</div></script>'
    },
    _init: function(opt) {
      this.default = extend(this.default, opt, true);
      this._initTemplate();
      this.tpl = engine(this.default.template.trim(), this.default);
      this.dom = this._parseToDom(this.tpl);
      document.body.appendChild(this.dom);
      this._initEvent();
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
          iStr += '<li command='+item[i].command+'>' + item[i].label + '</li>'
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
    },
    _initEvent: function() {
      let dropdown = document.getElementsByClassName('ir-dropdown')[0],
          header = document.getElementsByClassName('ir-dropdown-header')[0],
          items = document.getElementsByClassName('ir-dropdown-list')[0],
          event = this.default.trigger === 'hover' ? 'mouseover' : 'click';
      if (this.default.trigger === 'hover') {
        dropdown.addEventListener(event, function() {
          items.className = items.className.replace(/\shide/gi, '');
        })
        dropdown.addEventListener('mouseout', function(e) {
          e.stopPropagation();
          items.className += ' hide';
        })
      } else {
        header.addEventListener(event, function(e) {
          e.stopPropagation();
          if (items.className.indexOf('hide') < 0) {
            items.className += ' hide';
          } else {
            items.className = items.className.replace(/\shide/gi, '');
          }
        }, false)
        header.addEventListener('DOMFocusOut', function(e) {
          e.stopPropagation();
          if (items.className.indexOf('hide') < 0) {
            items.className += ' hide';
          }
        }, false)
      }
      if(this.default.command) {
        let hander = this.default.command;
        if (toRawType(hander) === 'Function') {
          let items = document.getElementsByClassName('ir-dropdown-list')[0],
              ul = items.getElementsByTagName('ul')[0];
          //事件委托
          ul.addEventListener('click', function(e) {
            hander.call(this, e.target.getAttribute('command'));
          })
        }
      }
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
}(engine,extend,toRawType))