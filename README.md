# Weak.js

Weak.js implements a variety of data structures to reduce the memory footprint of a JavaScript application. It depends on OscarTheGrouch.js.

## Usage
A ```WeakReference``` has a single method ```get``` that returns a reference to the object with which it was created without preventing garbage collection.
```js
var anObject = {
    foo: 'bar'
};

var wAnObject = WeakReference(anObject); 

wAnObject.get() === anObject; // true

anObject = null; // anObject is no longer referenceable

setTimeout(function() {
   wAnObject.get() === null; // true
}, 5000);
```

A ```WeakMap``` works similarly to a ```Map``` except the keys must be objects. When the key of a ```WeakMap``` is collected, the corresponding value is freed.
```js
var weakMap = WeakMap();

var key = {
    foo: 'bar'
};

var expando = {
    expandoProperty: 'foobar'
};

weakMap.set(key, expando);
weakMap.has(key); // true
weakMap.get(key) === expando; // true

expando = null; // expando is only referenceable through weakMap
key = null; // key is no longer referenceable (exando will be collected when key is collected)
```