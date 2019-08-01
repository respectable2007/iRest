export * from './engine.js'
/**
 * 对象合并
 * @param {*} o 
 * @param {*} n 
 * @param {*} override 
 */
export function extend(o,n,override) {
    for(var key in n){
        if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
            o[key]=n[key];
        }
    }
    return o;
}
const toString = Object.prototype.toString;
export function toRawType(value) {
  return toString.call(value).slice(8, -1);
}