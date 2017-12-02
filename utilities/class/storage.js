const StorageFactory = class StorageFactory {
  static load(namespace, scope, storeMethod){
    if(!storeMethod){
      if(!!localStorage){
        storeMethod = 'local';
      } else if(navigator.cookieEnabled){
        storeMethod = 'cookie';
      } else {
        throw new Error('Could not initialize storage.');
      }
    }

    return StorageFactory['init'+storeMethod](namespace, scope);
  }

  static initlocal(namespace, scope){
    return new ConcreteLocalStorage(namespace, scope);
  }
  static initcookie(namespace, scope){
    return new ConcreteCookieStorage(namespace, scope);
  }
};

const AbstractStorage = class AbstractStorage {
  constructor(namespace, scope){
    if (!namespace) throw new Error('namespace is required.');
    this.namespace = namespace;
    this.scope = scope || [];
    this.load(namespace, scope);
  }
  load(){}
  save(){}
  get(){}
  set(){}
  delete(){}
};

const ConcreteLocalStorage = class ConcreteLocalStorage extends AbstractStorage{
  constructor(namespace, scope){
    if (!localStorage){
      throw new Error('localStorage does not supported.');
    }
    super(namespace, scope);
  }
  load(){
    if (!localStorage.getItem(this.namespace)) localStorage.setItem(this.namespace, '{}');
    this.storage = JSON.parse(localStorage.getItem(this.namespace));
    console.log('storage successfully loaded.');
  }
  save(key, value){
    console.log('save key: %s, value: %s', key, value);
    if(!Object.isBlank(key)) this.set(key, value);
    localStorage.setItem(this.namespace, JSON.stringify(this.storage));
    console.log('storage saved: '+ JSON.stringify(this.storage));
  }
  get(key){
    if(Object.isBlank(key)) return this.storage.rget(this.scope.join('.'));
    return this.storage.rget(this.scope.join('.')+'.'+key);
  }
  set(key, value){
    if (this.get(key) === value) return;
    this.storage.rset(this.scope.join('.')+'.'+key, value);
    console.log('key: %s, value: %s', key, value);
    console.log('storage set: '+ JSON.stringify(this.get()));
    return this;
  }
  delete(key){
    delete this.storage[key];
  }
};
