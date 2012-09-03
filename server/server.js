/* 
  NOTE:
    This is using Socket.io (http://socket.io)
    For reasons of redundancy, I have not included my node_modules folder
*/

// dependencies
var io = require('socket.io').listen(8011);

// observer
/* // don't need this yet..
var Event = function () {
  this.f = [];
};
 
Event.prototype.subscribe = function (fn) {
  this.f.push(fn);
};
 
Event.prototype.fire = function () {
  for (var i in this.f) this.f[i](arguments);
};
*/

// application state
var games     = {},
    players   = {};

// client
var Client = function (s) {
  this.s          = s;
  this.name       = undefined;
  this.id         = s.id;
  this.registered = false;

  var _self = this;

  // on: disconnect
  s.on('disconnect', function () {
    if (_self.registered) {
      delete players[s.id];

      var all_players = listplayers();
      broadcast('listplayers', all_players);
    }
  });

  // on: listgames
  function listgames () {
    var all_games = [];

    for (game in games) {
      all_games.push({
        'name': games[game].name,
        'id':   games[game].id
      });
    }

    s.emit('games', { 'games': all_games });
  }
  s.on('listgames', listgames);

  // on: listplayers
  function listplayers () {
    var all_players = [];

    for (player in players) {
      all_players.push({
        'name': players[player].name,
        'id':   players[player].id
      });
    }

    return { 'players': all_players };
  }

  s.on('listplayers', function () {
    s.emit('listplayers', listplayers());
  });

  // on: joingame
  s.on('joingame', function (jres) {
    if (jres && jres.gameid) {

      return;
    }

    s.emit('joingame', {
      valid:    false,
      message:  'Unable to join game.'
    });
  });

  // broadcast to all
  var broadcast = function (t, o) {
    for (player in players) {
      players[player].s.emit(t, o);
    }
  };

  // on: register
  s.on('register', function (jres) {
    if (jres && jres.name) {
      _self.name        = jres.name;
      _self.registered  = true;
      players[s.id]     = _self;

      s.emit('register', { valid: true });
      
      var all_players = listplayers();
      broadcast('listplayers', all_players);

      return;
    }

    s.emit('register', {
      valid:    false,
      message:  'You must specify a name.'
    });
  });

};

// connection state
io.sockets.on('connection', function (s) {
  new Client(s);
});
