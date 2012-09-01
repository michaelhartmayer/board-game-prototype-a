Machinespark.GameField = function () {
  this.jqGameField  = $('#gamefield');
  this.jqStatus     = $('#status');
  this.jqSelection  = $('#selection');
  this.jqBoard      = $('#board');

  this.tmplStatus     = $('#tmpl_status');
  this.tmplSelection  = $('#tmpl_selection');
  this.tmplBoard      = $('#tmpl_board');

  this.hbStatus       = Handlebars.compile(this.tmplStatus.html());
  this.hbSelection    = Handlebars.compile(this.tmplSelection.html());
  this.hbBoard        = Handlebars.compile(this.tmplBoard.html());
};

Machinespark.GameField.prototype.updateStatus = function (o) {
  this.jqStatus.html(this.hbStatus(o));
  return;
};

Machinespark.GameField.prototype.updateSelection = function (o) {
  this.jqSelection.html(this.hbSelection(o));
  return;
};

Machinespark.GameField.prototype.updateBoard = function (o) {
  this.jqBoard.html(this.hbBoard(o));
  return;
};

$(function () {
  var oGameField = new Machinespark.GameField();

  // demo status
  oGameField.updateStatus({
    player: {
      name: 'Michael',
      chp:   30,
      mhp:   30
    },
    opponent: {
      name: 'Some Guy',
      chp:   30,
      mhp:   30
    },
    turn: {
      player_name: 'Michael'
    }
  });

  // demo board
  var board = [];
  for (var i = 0; i < (6 * 8 * 2); i++) {
    board.push({
      empty:  true,
      c:      i - ~~(i/8) * 8,
      r:      ~~(i/8)
    })
  };

  oGameField.updateBoard({
    board: board
  });
});
