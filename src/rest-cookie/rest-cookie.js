/* rest-cookies */
;(function(window, factory){
  "use strict";
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else if(typeof define === 'function' && define.amd) {
    define(factory());
  } else {
     var oldCookies = window.Cookies;
     var api = window.Cookies = factory();
     api.noConflict = function() {
       window.Cookies = oldCookies;
       return api;
     }

  }
})(window, function() {
    var cached = {};
    function Cookies() {

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

        if (key === name) {
          result = cookie;
          break;
        } else {
          result[name] = cookie;
        }
        
      }
      return decodeURIComponent(result);
    }
    /* set */
    Cookies.prototype.set = function(key, value) {
        if(!key || !document.cookie) return;
        var cookies = document.cookie.split('; '),
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
        for(i; i < lens; i++) {
          var parts = cookies[i].split('='),
              cookie = parts.slice(1).join('=')
              name = parts[0];
          if (key === name && cookie !== value) {
            if(value !== '') {
              cookies[i] = value;
            } else {
              cookies.splice(i, 1);
            }
            break;
          } 
        }
        document.cookie = cookies.join('; ');
        debugger;
    }
    /* delete */
    Cookies.prototype.delete = function(key) {
      this.set(key, '')
    }
    var Cookies = new Cookies();
    return Cookies;
})