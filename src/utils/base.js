import '../utils/class.js'
import { addEvent, removeEvent } from '../compate'
import { _ } from 'underscore'
//模板引擎underscore
/**
 * 检查数组项是否存在
 */
function findIndex(arr, key) {
  if(arr === null) return -1
  var i = 0,
      lens = arr.length
  for(; i < lens; i++) {
    if(arr[i] === key) {
      return i
    }
  }
  return -1
}
/**
 * 事件机制（观察者[订阅-通知]）
 */
var Event = Class.extend({
  //监听者
  on(key, fn) {
    if(!this._listener) {
      this._listener = {}
    }
    if(!this._listener[key]) {
      this._listener[key] = []
    }
    if(typeof fn === 'function' && findIndex(this._listener[key], fn) === -1) {
      this._listener[key].push(fn)
    }
    return this
  },
  //通知
  fire(key) {
    if(!this._listener || !this._listener[key]){
      return this;
    }
    let fns = this._listener[key],
        lens = fns.length,
        i = 0,
        args = Array.prototype.slice.call(arguments, 1) || []
    for(; i < lens; i++) {
      fns[i].apply(this, args)
    }
    return this
  },
  //删除某个监听者
  off(key, fn) {
    if(!key && !fn){
      this._listener = {}
    }
    if(key && !fn) {
      delete this._listener[key]
    }
    if(key && fn) {
      let arr = this._listener[key],
          index = findIndex(arr, fn)
      index > -1 && arr.splice(index, 1)
    }
    return this;
  }
})
/**
 * 组件通用方法
 */

export var base = Event.extend({
  //事件集合
  events: {},
  //默认配置
  _opts: {
    template: '',
    parentNode: null || document.body
  },
  //元素节点添加事件
  _delegateEvent(){
    let events = this.events,
        selector = '',
        currentNode = this.get('_renderNodes'),
        node = currentNode ? currentNode : this._opts.parentNode,
        tag = node.tagName,
        cldss =node.getAttribute('class')
    if(tag !== 'body') {
      selector = tag.toLowerCase() 
                 + ( cldss ? '.' + cldss : '') 
    }
    for(let e in events) {
      let nodes = document.querySelectorAll(selector + ' ' + e),
          lens = nodes.length,
          i = 0;
      if(lens) {
        for(; i < lens; i++) {
          let types = events[e]
          for(let type in types) {
            event.addEvent(this, nodes[i], type, types[type])
          }
        }
      }
    }
  },
  //初始化
  init(options){
    this._opts = assign(this._opts,options)
    //this.bind()
    this.setUp()
    this._delegateEvent()
  },
  //获取配置参数
  get(key){
    return this._opts[key]
  },
  //设置配置参数
  set(key, value){
    this._opts[key] = value
  },
  //渲染模板
  setUp() {
    this.render()
  },
  //单向绑定
  setChunkData(key, value) {
    let data =  this.get('_renderData')
    if(typeof key == 'string') {
        data[key] = value
    }
    if(typeof key == 'object') {
      for(var i in key) {
        data[i] = key[i]
      }
    }
    if(typeof this.initOptions == 'function') {
      this.initOptions()
    }
    if(!this._opts.template) return
    this.destroy();
    let compile = _.template(this._opts.template.trim(),{ variable:'data'}),
        div = document.createElement('div'),
        parentNode = this.get('parentNode') || document.body
    div.innerHTML = compile(this._opts)
    let currentNode = div.childNodes[0]
    parentNode.replaceChild(currentNode, this.get('_renderNodes'))
    this.set('_renderNodes', currentNode)
    div = null
    //替换元素后，要重新委托自定义事件
    if(this.events) {
      this._delegateEvent();
    }
  },
  //事件绑定
  //bind(){
  //},
  //渲染模板
  render(data){
    this.set('_renderData', data)
    if(! this._opts.template)  return
    let compile = _.template(this._opts.template.trim(), {variable:'data'}),
        div = document.createElement('div'),
        parentNode = this.get('parentNode') || document.body
    div.innerHTML = compile(this._opts)
    let currentNode = div.childNodes[0]
    this.set('_renderNodes', currentNode)
    parentNode.appendChild(currentNode)
    div = null
  },
  //销毁组件注册的事件
  destroy(){
    //off all event listeners
//    this.off()
//    this.set('_renderNodes', null)
    if(this.events) {
      var events = this.events,
          currentNode = this.get('_renderNodes'),
          node = currentNode ? currentNode : this._opts.parentNode,
          tag = node.tagName,
          cldss =node.getAttribute('class');
      if(tag !== 'body') {
        selector = tag.toLowerCase()
                   + ( cldss ? '.' + cldss : '')
      }
      for(let e in events) {
        let nodes = document.querySelectorAll(selector + ' ' + e),
           lens = nodes.length,
            i = 0;
        if(lens) {
          for(; i < lens; i++) {
            let types = events[e]
            for(let type in types) {
              event.removeEvent(nodes[i], type, types[type])
            }
          }
        }
      }
    }
  }
})