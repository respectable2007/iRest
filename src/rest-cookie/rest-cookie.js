/* rest-cookies */
;(function(window, document, factory){
  "use strict";
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(document);
  } else if(typeof define === 'function' && define.amd) {
    define(factory(document));
  } else {
     var oldCookies = window.Cookies;
     var api = window.Cookies = factory(document);
     api.noConflict = function() {
       window.Cookies = oldCookies;
       return api;
     }

  }
})(window, document, function(document) {
    function Cookies() {
      this.default = {
        domain: true,
        secure: true,
        expires: true
      }
    }
    /* get */
    Cookies.prototype.get = function(key) {
      if(!key || !document.cookie) return;
      var cookies = document.cookie.split('; '),
          lens = cookies.length,
          i = 0,
          result;
      for(i; i < lens; i++) {
        var parts = cookies[i].split('='),
            cookie = parts.slice(1).join('='),
            name = parts[0];

        if (this.default[key] && (key === name) || key === decodeURIComponent(name)) {
          result = cookie;
          break;
        } else {
          result[name] = cookie;
        }
        
      }
      return this.default[key] ? result : decodeURIComponent(result);
    }
    /* set 
       如果是default内的，key，value必填
       需要修改，请参考js-cookie
    */
    Cookies.prototype.set = function(key, value, attributes) {
        if(!key) return;
        if(!value) {
          document.cookie += '; expires=' + 'Thu, 01 Jan 1970 00:00:00 GMT'
        }
        var cookies = document.cookie ? document.cookie.split('; '):[],
            lens = cookies.length,
            i = 0;
        if(value instanceof Date) {
          value = value.toGMTString();
        }
        try {
          var result = JSON.stringify(value);
          if(result.search(/^[\{\[]}]/g) > -1) {
            value = result;
          }
        }catch(e){}
        /* 存在修改 */
        for(i; i < lens; i++) {
          var parts = cookies[i].split('='),
              name = parts[0];
          if ((this.default[key] && (key === name))
              || (encodeURIComponent(key) === name)) {
              cookies[i] = this.default[key]? key + '=' + value : encodeURIComponent(key) + '=' +encodeURIComponent(value);
            break;
          } 
        }
        /* 不存在添加 */
        if (i >= lens) {
          var result = this.default[key] ? key + '=' + value : encodeURIComponent(key) + '=' +encodeURIComponent(value);
          cookies.push(result)
        }
        document.cookie = '';
        document.cookie = cookies.join('; ');
    }
    /* delete */
    Cookies.prototype.delete = function(key) {
      this.set(key, '')
    }
    var Cookies = new Cookies();
    return Cookies;
})