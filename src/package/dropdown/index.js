import { base } from '../../utils/base.js'
// ;(function(engine, extend, toRawType){
//   "use strict";
//   //唯一标识符
//   let id = 0;
//   function DropDown(opt) {
//     this.id = 'dropdown-menu-' + id;
//     id ++;
//     this._init(opt);
//   }
//   DropDown.prototype = {
//     constructor: DropDown,
//     default: {
//       trigger: 'hover',
//       template: '<script type="text/template" id="dropdown"><div class="ir-dropdown">'
//       +'<div class="ir-dropdown-header">下拉菜单</div>'
//       +'<div class="ir-dropdown-list hide"><ul>条目</ul></div>'
//       +'</div></script>',
//       show: false
//     },
//     _init: function(opt) {
//       this.default = extend(this.default, opt, true);
//       this._initTemplate();
//       this.tpl = engine(this.default.template.trim(), this.default);
//       this.dom = this._parseToDom(this.tpl);
//       document.body.appendChild(this.dom);
//       this._initEvent();
//     },
//     //初始化模板
//     _initTemplate: function() {
//       let {header, item, template} = this.default,
//           lens = item.length,
//           i = 0,
//           iStr = '',
//           that = this;
//       template = template.replace(/(ir-dropdown")|(<ul)/gi, function(...m) {
//           return m[0] + (m[0].indexOf("ir") > 0 ?' aria-control="'+ that.id +'"' : ' id="'+ that.id +'"');
//       });
//       if (header) {
//         template = template.replace(/下拉菜单/gi, header);
//       }
//       if (lens > 0) {
//         for(i; i < lens; i++) {
//           iStr += '<li command='+item[i].command+'>' + item[i].label + '</li>'
//         }
//       }
//       template = template.replace(/条目/gi, iStr);
//       this.default.template = template;
//     },
//     //string to Dom
//     _parseToDom: function(str) {
//       let div = document.createElement('div');
//       if(typeof str === 'string') {
//         div.innerHTML = str;
//       }
//       return div.childNodes[0];
//     },
//     //下拉框出现/隐藏触发
//     vChange: function(t, value) {
//       let vc = this.default.visibleChange;
//       if(vc) {
//         vc.call(t, value);
//       }
//     },
//     //初始化事件
//     _initEvent: function() {
//       let dropdown = document.getElementsByClassName('ir-dropdown')[0],
//           header = document.getElementsByClassName('ir-dropdown-header')[0],
//           items = document.getElementsByClassName('ir-dropdown-list')[0],
//           event = this.default.trigger === 'hover' ? 'mouseover' : 'click',
//           that = this;
//       //trigger-hover
//       if (this.default.trigger === 'hover') {
//         dropdown.addEventListener(event, function(e) {
//           e.stopPropagation();
//           if (!that.default.show) {
//             items.className = items.className.replace(/\shide/gi, '');
//             that.vChange(this, true);
//             that.default.show = true;
//           }
//         })
//         dropdown.addEventListener('mouseout', function(e) {
//           e.stopPropagation();
//           let rId = e.relatedTarget.parentElement ? 
//                     (e.relatedTarget.parentElement.id ? e.relatedTarget.parentElement.id : false)
//                     : false;
//           if(!rId || rId!== that.id) {
//             items.className += ' hide';
//             that.vChange(this, false);
//             that.default.show = false;
//           }
//         })
//       //trigger-click
//       } else {
//         header.addEventListener(event, function(e) {
//           e.stopPropagation();
//           let v = true;
//           if (items.className.indexOf('hide') < 0) {
//             items.className += ' hide';
//             v = false;
//           } else {
//             items.className = items.className.replace(/\shide/gi, '');
//             v = true;
//           }
//           that.vChange(this, v);
//         }, false)
//         header.addEventListener('DOMFocusOut', function(e) {
//           e.stopPropagation();
//           if (items.className.indexOf('hide') < 0) {
//             items.className += ' hide';
//           }
//           that.vChange(this, v);
//         }, false)
//       }
//       //commmand回调
//       if(this.default.command) {
//         let hander = this.default.command;
//         if (toRawType(hander) === 'Function') {
//           let items = document.getElementsByClassName('ir-dropdown-list')[0],
//               ul = items.getElementsByTagName('ul')[0];
//           //事件委托
//           ul.addEventListener('click', function(e) {
//             hander.call(this, e.target.getAttribute('command'));
//           })
//         }
//       }
//     }
//   }
//   //模块导出
//   if(typeof module !='undefined' && module.exports) {
//     module.exports = DropDown;
//   }else if(typeof define == 'function' && define.amd) {
//     define(function() {
//       return DropDown;
//     })
//   }else {
//     var global = (function(){
//       return this || (0, eval)('this');
//     }());
//     !('DropDown' in global) && (global.DropDown = DropDown);
//   }
// }(engine,extend,toRawType))