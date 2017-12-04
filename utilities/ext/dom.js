// @name DOM extension
// @version 0.1
// @author e2718281828nop3
// @copyright 2017, e2718281828nop3(https://github.com/e2718281828nop3/)
// @license GPLv3
// @namespace https://github.com/e2718281828nop3/
// @exclude *
if (!Object.prototype.hasOwnProperty('e2718281828nop3'))
  throw new Error('require ext/object first.');

const log = console.log;

[HTMLCollection, NodeList].each(obj => {
  if (!obj.prototype.hasOwnProperty('first')) {
    Object.defineProperty(obj.prototype, 'first', {
      get: function(){return this[0];}
    });
  }
  if (!obj.prototype.hasOwnProperty('last')) {
    Object.defineProperty(obj.prototype, 'last', {
      get: function(){return this[this.length-1];}
    });
  }
});

if (!Element.prototype.hasOwnProperty('appendChildren')) {
  Object.defineProperty(
    Element.prototype, 
    'appendChildren',
    {
      value: function(){
        for(let i = 0; i < arguments.length; i++) {
          if (Object.isTypeOf('array', arguments[i])) {
            arguments[i].forEach(function(e){this.appendChild(e);});
          } else {
            this.appendChild(arguments[i]);
          }
        }
        return this;
      }
    }
  );
}

({'show': {value: function(e) {(e || this).style.display = 'block';}},
  'hide': {value: function(e) {(e || this).style.display = 'none';}},
  '$': {value: Element.prototype.querySelector},
  '$all': {value: Element.prototype.querySelectorAll},
  '$id': {value: Element.prototype.getElementById},
  '$class': {value: Element.prototype.getElementsByClassName},
  '$tag': {value: Element.prototype.getElementsByTagName},
  '$last': {value: function(str) {return this.$all(str).last;}},
}).each(function(v, k){
  if (!Element.prototype.hasOwnProperty(k))
    Object.defineProperty(Element.prototype, k, v);
});

const $ = str => document.querySelector(str);
const $all = str => document.querySelectorAll(str);
const $id = str => document.getElementById(str);
const $class = str => document.getElementsByClassName(str);
const $create = str => document.createElement(str);
const $last = str => $all(str).last;
