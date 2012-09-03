Machinespark.ListGames = function () {
  this.jqListGames    = $('#listgames');
  this.tmplListGames  = $('#tmpl_listgames');
  this.hbListGames    = Handlebars.compile(this.tmplListGames);

  this.jqListGames.modal();

  return this;
};

Machinespark.ListGames.prototype.updateList = function (o) {
  this.hbListGames(o);
  return this;
};

Machinespark.ListGames.prototype.clearList = function () {
  this.updateList({ games: [] });
  return this;
};

Machinespark.ListGames.prototype.show = function () {
  this.jqListGames.show();
  return this;
};

Machinespark.ListGames.prototype.hide = function () {
  this.jqListGames.hide();
  return this;
};
