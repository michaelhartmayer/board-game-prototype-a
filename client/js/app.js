// IE TARD
if(!("console" in window)) {
  window.console = {}
  window.console.log = function () {};
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
 
    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };
 
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
 
    return fBound;
  };
}

/* Application */
Machinespark.GameClient = function () {
  $(this.setup.bind(this));
};

Machinespark.GameClient.prototype.setup = function () {
  // socket.io
  this.gameserver   = io.connect('http://76.176.40.244:8011'),

  // ui
  this.listGames    = new Machinespark.ListGames();
  this.listPlayers  = new Machinespark.ListPlayers();

  // state
  this.game         = {}

  // modals
  this.gameJoin     = new Machinespark.GameJoin();

  // on: register
  this.gameserver.on('register', this.on_register.bind(this));

  // on: makegame
  this.gameserver.on('makegame', this.on_makegame.bind(this));

  // on: listplayers
  this.gameserver.on('listplayers', this.on_listplayers.bind(this));

  // on: listgames
  this.gameserver.on('listgames', this.on_listgames.bind(this));

  // on: gameupdate
  this.gameserver.on('gameupdate', this.on_gameupdate.bind(this));

  // event: onplay
  this.gameJoin.onPlay.subscribe(this.event_onPlay.bind(this));

  // event: onregister
  this.listPlayers.onMakeGame.subscribe(this.event_onMakeGame.bind(this));
};

// on: fired when server responds with list of games
Machinespark.GameClient.prototype.on_listgames = function (jres) {
  return;
  console.log('[listgames]', jres);
  this.listGames.updateList(jres);
};

// on: fired when server responds with list of players
Machinespark.GameClient.prototype.on_listplayers = function (jres) {
  console.log('[listplayers]', jres);
  this.listPlayers.updateList(jres);
};

// on: fired when server responds with make game session
Machinespark.GameClient.prototype.on_makegame = function (jres) {
  if (!jres.valid) {
    alert(jres.message);
    return false;
  }

  console.log('[makegame]', jres);
  
  this.game.token = jres['token'];
  this.game.field = new Machinespark.GameField();
};

Machinespark.GameClient.prototype.on_gameupdate = function (jres) {
  if (jres.updateStatus) {
    this.game.field.updateStatus(jres.updateStatus);
  }

  if (jres.updateField) {
    this.game.field.updateField(jres.updateField);
  }
};

// on: fired when server responds with registration answer
Machinespark.GameClient.prototype.on_register = function (jres) {
  if (jres.valid) {
    $.modal.close();
    this.listGames.show();
    this.gameserver.emit('listgames');
    this.gameserver.emit('listplayers');
  } else {
    alert(jres.message);
  }
};

// event: fired when player enters name into dialog and hits play
Machinespark.GameClient.prototype.event_onPlay = function (name) {
  console.log('(register)', name);
  this.gameserver.emit('register', { 'name': name });
};

// event: fired when player clicks on opponent to make game
Machinespark.GameClient.prototype.event_onMakeGame = function (opponent_id) {
  console.log('(makegame)', opponent_id);
  this.gameserver.emit('makegame', { 'opponent_id': opponent_id });
};

/* Run */
Machinespark.oGameClient = new Machinespark.GameClient();
