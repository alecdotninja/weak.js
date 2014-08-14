(function(global) {
	var WeakReference = function WeakReference(object) {
	  var weakReference = Object.create(WeakReference.prototype);

		if(!object || (typeof(object) !== 'object' && typeof(object) !== 'function')) {
			throw new Error('Can not hold WeakReference to primative');
		}
		
		var objectId = OTG.getObjectId(object);

		if(!objectId) throw new Error('Cannot get objectId');
		weakReference._objectId = objectId;

		return weakReference;
	};

	WeakReference.prototype.get = function get() {
		return Object.getObjectById(this._objectId);
	};
	
	global.WeakReference = WeakReference;
	
	var WeakMap = function WeakMap() {
		var weakMap = Object.create(WeakMap.prototype);
		
		weakMap.clear();
		
		return weakMap;
	};
	
	WeakMap.prototype.set = function set(key, value) {
		var objectId = OTG.getObjectId(key);
		
		this._map[objectId] = value;
		
		var wMap = WeakReference(this._map);
		
		OTG.notifyOnCollection(objectId, function() {
			var map = wMap.get();
			
			if(map) delete map[objectId];
		});
	};
	
	WeakMap.prototype.get = function get(key) {
		var objectId = OTG.getObjectId(key);
		
		return this._map[objectId];
	};
	
	WeakMap.prototype.has = function has(key) {
		var objectId = OTG.getObjectId(key);
		
		return objectId in this._map;
	};
	
	WeakMap.prototype.delete = function(key) {
		var objectId = OTG.getObjectId(key);
		
		return delete this._map[objectId];
	};
	
	WeakMap.prototype.clear = function clear() {
		this._map = Object.create(null);
		
		return true;
	};
	
	if(!global.WeakMap) global.WeakMap = WeakMap;
})(this);