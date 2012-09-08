/* 
  NOTE:
    This is using Socket.io (http://socket.io)
    For reasons of redundancy, I have not included my node_modules folder
*/

// socket.io - listen
var io = require('socket.io').listen(8011);

// application state
var games     = {},
    players   = {};

// helper: list all players, returns json object
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

// helper: list all games, returns json object
function listgames () {
  var all_games = [];

  for (game in games) {
    all_games.push({
      'name': games[game].name,
      'id':   games[game].id
    });
  }

  return { 'games': all_games };
}

// helper: broadcast to all
function broadcast (emit, message) {
  for (player in players) {
    players[player].s.emit(emit, message);
  }
};

// class: session
var Session = function (s) {
  this.s          = s;
  this.name       = undefined;
  this.id         = s.id;
  this.registered = false;

  var _self = this;

  // on: disconnect
  s.on('disconnect', function () {
    if (_self.registered) {
      delete players[s.id];
      broadcast('listplayers', listplayers());
    }
  });

  // on: listgames
  s.on('listgames', function () {
    s.emit('listgames', listgames());
  });

  // on: listplayers
  s.on('listplayers', function () {
    s.emit('listplayers', listplayers());
  });

  // on: makegame
  s.on('makegame', function (jres) {
    if (jres && jres.opponent_id) {
      // same player?
      if (jres.opponent_id == s.id) {
        s.emit('makegame', {
          valid:    false,
          message:  'You cant play with yourself!'
        });
        return;
      }

      // ok: make a game
      new GameSession(players[s.id], players[jres.opponent_id]);
      return;
    }

    s.emit('makegame', {
      valid:    false,
      message:  'Unable to join game.'
    });
  });

  // on: register
  s.on('register', function (jres) {
    if (jres && jres.name) {
      _self.name        = jres.name;
      _self.registered  = true;
      players[s.id]     = _self;

      s.emit('register', { valid: true });
      broadcast('listplayers', listplayers());

      console.log("CONNECTION REGISTERED: EMITTING:")
      console.log(listplayers());

      return;
    }

    s.emit('register', {
      valid:    false,
      message:  'You must specify a name.'
    });
  });
};

// -----------------------------------------------------------
// class: gamesession
var GameSession = function (client_initiator, client_target) {
  this.token    = client_initiator.s.id + (Math.random() * 10000) + client_target.s.id;
  
  // emit to players in game session
  function emit_players (emit, message) {
    client_initiator.s.emit(emit, message);
    client_target.s.emit(emit, message);
  }

  emit_players('makegame', {
    valid:    true,
    token:    this.token
  });
}

// connection state
io.sockets.on('connection', function (s) {
  new Session(s);
});
