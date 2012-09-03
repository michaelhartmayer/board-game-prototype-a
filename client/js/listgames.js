Machinespark.ListGames = function () {
  this.jqListGames    = $('#listgames');
  this.tmplListGames  = $('#tmpl_listgames');
  this.hbListGames    = Handlebars.compile(this.tmplListGames);

  // reset list
  this.clearList();

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
