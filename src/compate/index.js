/**
 * 通过class查找dom
 */
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
export var addEvent = (function(){
  if(window.addEventListener) {
    return function(el,type,fn) {
      var tmp = new Function(fn.toString())
      fn = function(e) {
        tmp.call(el,e)
      }
      el.addEventListener(type, fn, false)
    }
  }
  if(window.attatchEvent) {
    return function(el, type, fn) {
      var tmp = new Function(fn.toString())
      fn = function(e) {
        tmp.call(el,e)
      }
      el.attatchEvent('on' + type , fn)
    }
  }
})()
export var removeEvent = (function(){
  if(window.removeEventListener) {
    return function(el,type,fn) {
      el.removeEventListener(type,fn,false)
    }
  }
  if(window.detachEvent) {
    return function(el,type,fn) {
      el.detachEvent('on' + type, fn)
    }
  }
})()