Machinespark.ListPlayers = function () {
  this.jqListPlayers    = $('#listplayers');
  this.tmplListPlayers  = $('#tmpl_listplayers');
  this.hbListPlayers    = Handlebars.compile(this.tmplListPlayers.html());

  // events
  this.onMakeGame       = new Machinespark.Event();
  this.jqListPlayers.find('li').live('click', function (evt) {
    var opponent_id = $(evt.target).data('playerid') || $(evt.target).parents('li').data('playerid');
    this.onMakeGame.fire(opponent_id);
  }.bind(this));

  return this;
};

Machinespark.ListPlayers.prototype.updateList = function (o) {
  if (!o.players && !o.players.length) return false;
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
