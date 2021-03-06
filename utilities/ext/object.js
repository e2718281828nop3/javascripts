// @name Object extension
// @version 0.1
// @author e2718281828nop3
// @copyright 2017, e2718281828nop3(https://github.com/e2718281828nop3/)
// @license GPLv3
// @namespace https://github.com/e2718281828nop3/
// @exclude *
if (!Object.prototype.hasOwnProperty('e2718281828nop3')) {
Object.defineProperty(
    Object.prototype, 'e2718281828nop3', {value:'e2718281828nop3'});


//let Object.prototype be iterable.
//includes enumerable && own properties.
Object.prototype[Symbol.iterator] = function* () {
  const keys = Object.keys(this);
  for (let i = 0; i < keys.length; i++)
    yield [keys[i], this[keys[i]]];
};

Object.defineProperty(
    Object.prototype, 'each', {
        value: function(callback, thisObj){
                   for(const key of Object.keys(this)){
                      callback.call(thisObj, this[key], key, this);
                   }
               }
       }
);

Object.defineProperty(Object.prototype, 'ownLength', {
  get: function(){return Object.keys(this).length;}
});

Object.defineProperty(Object.prototype, 'extend', {
  configurable: false,
  enumerable: false,
  value: function(source) {
    Object.defineProperties(
      this, Object.getOwnPropertyDescriptors(source));
    return this;
  }
});

Object.defineProperty(Object.prototype, 'include', {
  configurable: false,
  enumerable: false,
  value: function(source) {
    if (source.proto !== null && source.proto !== this.proto)
      throw new Error('prototype of include object must be null or same as base object.');
    let protoObj = {}.extend(source);
    protoObj.proto = this.proto;
    this.proto = protoObj;
    return this;
  }
});

Object.defineProperty(
    Object.prototype, 'proto', {
      get: function(){
             return Object.getPrototypeOf(this);
           },
  set: function(obj){
         Object.setPrototypeOf(this, obj);
         return this;
       },
    }
    );

//utility method
Object.defineProperty(Object.prototype, 'isBlank', {
  value: function(obj){
           let objType = Object.objType(obj);
           switch(objType){
             case 'null':
             case 'undefined':
               return true;
             case 'array':
             case 'string':
               return obj.length === 0;
             case 'object':
               return Object.keys(obj).length === 0;
             case 'number':
             case 'function':
               return false;
             default:
               throw new Error("not implemented yet : "+ objType);
           }
         }
});

//recursive get
Object.defineProperty(Object.prototype, 'rget', {
  value: function(keys){
           if (typeof keys == 'string') keys = keys.split('.');
           return keys.reduce(function(obj, key){
             return obj && obj[key];
           }, this);
         },
});

//recursive set
Object.defineProperty(Object.prototype, 'rset', {
  value: function(keys, value){
           if (typeof keys == 'string') keys = keys.split('.');
           return keys.reduce(function(obj, key, i){
             if (!obj.hasOwnProperty(key) && (i < keys.length-1)) obj[key] = {};
             if (i == keys.length - 1) obj[key] = value;
             return obj[key];
           }, this);
         },
});

Object.defineProperty(Object.prototype, 'objType', {
  value: obj => ({}).toString.call(obj).slice(8, -1).toLowerCase()
});

Object.defineProperty(Object.prototype, 'isTypeOf', {
  value: (typeStr, obj) => typeStr === Object.objType(obj)
});
}
