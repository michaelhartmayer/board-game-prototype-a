/* Application */
Machinespark.Application = function () {
  $(this.setup.bind(this));
};

Machinespark.Application.prototype.setup = function () {
  this.gameserver = io.connect('http://localhost:8011');
};

/* Run */
var App = new Machinespark.Application();
