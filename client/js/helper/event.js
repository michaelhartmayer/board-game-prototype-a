Machinespark.Event = function () {
  this.f = [];
};
 
Machinespark.Event.prototype.subscribe = function (fn) {
  this.f.push(fn);
};
 
Machinespark.Event.prototype.fire = function () {
  for (var i in this.f) this.f[i](arguments);
};
