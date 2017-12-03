// @name Array extension
// @version 0.1
// @author e2718281828nop3
// @copyright 2017, e2718281828nop3(https://github.com/e2718281828nop3/)
// @license GPLv3
// @namespace https://github.com/e2718281828nop3/
// @exclude *
Object.defineProperties(Array.prototype, {
    'first': {
        get: function(){return this[0];}
    },
    'last': {
        get: function(){return this[this.length-1];}
    },
});
