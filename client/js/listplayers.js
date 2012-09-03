Machinespark.ListPlayers = function () {
  this.jqListPlayers    = $('#listplayers');
  this.tmplListPlayers  = $('#tmpl_listplayers');
  this.hbListPlayers    = Handlebars.compile(this.tmplListPlayers.html());

  return this;
};

Machinespark.ListPlayers.prototype.updateList = function (o) {
  if (!o.players.length) return false;
  console.log('>>', o.players[0].name)
  this.jqListPlayers.html(this.hbListPlayers(o));

  return this;
};

Machinespark.ListPlayers.prototype.show = function () {
  this.jqListPlayers.show();
  return this;
};

Machinespark.ListPlayers.prototype.hide = function () {
  this.jqListPlayers.hide();
  return this;
};
