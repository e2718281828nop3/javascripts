// @name Array extension
// @version 0.1
// @author e2718281828nop3
// @copyright 2017, e2718281828nop3(https://github.com/e2718281828nop3/)
// @license GPLv3
// @namespace https://github.com/e2718281828nop3/
// @exclude *
if (!Array.prototype.hasOwnProperty('first')) {
  Object.defineProperties(Array.prototype, {
      'first': {
          get: function(){return this[0];}
      },
  });
}

if (!Array.prototype.hasOwnProperty('last')) {
  Object.defineProperties(Array.prototype, {
      'last': {
          get: function(){return this[this.length-1];}
      },
  });
}
