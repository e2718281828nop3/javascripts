// @name Array extension
// @version 0.1
// @author e2.718281828.nop3
// @copyright 2017, e2.718281828.nop3
// @license GPLv3
// @namespace https://openuserjs.org/users/e2.718281828.nop3
// @exclude *
Object.defineProperties(Array.prototype, {
    'first': {
        get: function(){return this[0];}
    },
    'last': {
        get: function(){return this[this.length-1];}
    },
});
