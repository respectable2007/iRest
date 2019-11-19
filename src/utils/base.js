import '../utils/class.js'
import { addEvent, removeEvent } from '../compate'
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
          i = 0
      if(lens) {
        for(; i < lens; i++) {
          let types = events[e]
          for(let type in types) {
            addEvent(this, nodes[i], type, types[type])
          }
        }
      }
    }
  },
  //模板转化，合并标签和数据，返回字符串
  _parseTempate(html, data) {
    html = html.replace(/(<script\b[^<]*>)|(<\/script>)/gi, '');
    var re = /<%([^%>]+)?%>/g,
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0;
    var match;
    var add = function(line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
  },
  //初始化
  init(options){
    this._opts = Object.assign(this._opts,options)
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
    let data = this.get('_renderData')
    data[key] = value
    if(!this._opts.template) return
    let str = this._parseTempate(this._opts.template.trim(), data),
        div = document.createElement('div'),
        parentNode = this.get('parentNode') || document.body
    div.innerHTML = str
    let currentNode = div.childNodes[0]
    parentNode.replaceChild(currentNode, this.get('_renderNodes'))
    this.set('_renderNodes', currentNode)
    div = null 
  },
  //事件绑定
  //bind(){
  //},
  //渲染模板
  render(data){
    this.set('_renderData', data)
    if(! this._opts.template)  return
    let str = this._parseTempate(this._opts.template.trim(), data),
        div = document.createElement('div'),
        parentNode = this.get('parentNode') || document.body
    div.innerHTML = str
    let currentNode = div.childNodes[0]
    this.set('_renderNodes', currentNode)
    parentNode.appendChild(currentNode)
    div = null
  },
  //销毁组件注册的监听者、事件和保存的已渲染节点
  destroy(){
    //off all event listeners
    this.off()
    this.set('_renderNodes', null)
    if(this.events) {
      for(let e in events) {
        let nodes = this.parentNode.querySelectorAll(e),
            lens = nodes.length,
            i = 0
        if(lens) {
          for(; i < lens; i++) {
            let types = events[e]
            for(let type in types) {
              removeEvent(nodes[i], type, types[type])
            }
          }
        }
      }
    }
  }
})