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
  this.gameserver     = io.connect('http://76.176.40.244:8011'),
  
  // modals
  this.gameJoin       = new Machinespark.GameJoin();

  // on: register
  this.gameserver.on('register', function (jres) {
    if (jres.valid) {
      $.modal.close();
      this.listGames.show();
      this.gameserver.emit('listgames');
      this.gameserver.emit('listplayers');
    } else {
      alert(jres.message);
    }
  }.bind(this));

  // on: makegame
  this.gameserver.on('makegame', function (jres) {
    console.log('[makegame]', jres);
    
    Machinespark.oGameField = new Machinespark.GameField();
    
  }.bind(this));

  // on: listplayers
  this.listPlayers = new Machinespark.ListPlayers();
  this.gameserver.on('listplayers', function (jres) {
    console.log('[listplayers]', jres);
    this.listPlayers.updateList(jres);
  }.bind(this));

  // on: listgames
  this.listGames = new Machinespark.ListGames();
  this.gameserver.on('listgames', function (jres) {
    return;
    console.log('[listgames]', jres);
    this.listGames.updateList(jres);
  });

  // on: test (for dev only)
  this.gameserver.on('test', function (jres) {
    console.log('[test]', jres);
    console.log(jres);
  });

  // event: onplay
  this.gameJoin.onPlay.subscribe(function (name) {
    console.log('(register)', name);
    this.gameserver.emit('register', { 'name': name });
  }.bind(this));

  // event: onregister
  this.listPlayers.onMakeGame.subscribe(function (opponent_id) {
    console.log('(makegame)', opponent_id);
    this.gameserver.emit('makegame', { 'opponent_id': opponent_id });
  }.bind(this));
};

/* Run */
Machinespark.oGameClient = new Machinespark.GameClient();
