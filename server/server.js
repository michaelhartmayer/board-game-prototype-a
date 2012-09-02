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
  this.registered = false;

  var _self = this;

  // on: register
  s.on('register', function (jres) {
    if (jres && jres.name) {
      _self.name        = jres.name;
      _self.registered  = true;
      players[s.id]     = _self

      s.emit('register', { valid: true });
      return;
    }

    s.emit('register', {
      valid:    false,
      message:  'You must specify a name.'
    });
    return;
  });

  // on: disconnect
  s.on('diconnect', function () {
    if (_self.registered) {
      delete players[s.id];
    }
  });

  // on: listgames
  s.on('listgames', function () {
    s.emit('listgames', {
      'listgames': games
    })
  });

  // on: listplayers
  s.on('listplayers', function () {
    var all_players = [];

    for (player in players) {
      all_players.push({
        'name': players[player].name
      });
    }

    s.emit('listplayers', { 'players': all_players });
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
};

// connection state
io.sockets.on('connection', function (s) {
  new Client(s);
});
