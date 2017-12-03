// @name DOM extension
// @version 0.1
// @author e2.718281828.nop3
// @copyright 2017, e2.718281828.nop3
// @license GPLv3
// @exclude *
const log = console.log;

[HTMLCollection, NodeList].each(obj => {
  Object.defineProperty(obj.prototype, 'first', {
    get: function(){return this[0];}
  });
  Object.defineProperty(obj.prototype, 'last', {
    get: function(){return this[this.length-1];}
  });
});

Element.prototype.appendChildren = function(){
  for(let i = 0; i < arguments.length; i++) {
    if (Object.isTypeOf('array', arguments[i])) {
      arguments[i].forEach(function(e){this.appendChild(e);});
    } else {
      this.appendChild(arguments[i]);
    }
  }
  return this;
};

Object.defineProperties(Element.prototype, {
  'show': {value: function(e) {(e || this).style.display = 'block';}},
  'hide': {value: function(e) {(e || this).style.display = 'none';}},
  '$': {value: Element.prototype.querySelector},
  '$all': {value: Element.prototype.querySelectorAll},
  '$id': {value: Element.prototype.getElementById},
  '$class': {value: Element.prototype.getElementsByClassName},
  '$tag': {value: Element.prototype.getElementsByTagName},
  '$last': {value: function(str) {return this.$all(str).last;}},
});

const $ = str => document.querySelector(str);
const $all = str => document.querySelectorAll(str);
const $id = str => document.getElementById(str);
const $class = str => document.getElementsByClassName(str);
const $create = str => document.createElement(str);
const $last = str => $all(str).last;
