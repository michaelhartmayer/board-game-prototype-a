/* Application */
Machinespark.GameClient = function () {
  $(this.setup.bind(this));
};

Machinespark.GameClient.prototype.setup = function () {
  this.gameserver     = io.connect('http://76.176.40.244:8011'),
  
  // modals
  this.gameJoin       = new Machinespark.GameJoin();
  this.listPlayers    = new Machinespark.ListPlayers();
  this.listGames      = new Machinespark.ListGames();

  // on: register
  this.gameserver.on('register', function (jres) {
    if (jres.valid) {
      this.gameJoin.hide();
      this.listGames.show();
    } else {
      alert(jres.message);
    }
  }.bind(this));

  // on: listplayers
  this.listPlayers = new Machinespark.ListPlayers();
  this.gameserver.on('listplayers', function (jres) {
    console.log(jres);
  }.bind(this));

  // on: listgames
  this.gameserver.on('listgames', function (jres) {
    console.log(jres);
  });

  // Register / Play Dialog
  this.gameJoin.onPlay.subscribe(function (name) {
    this.gameserver.emit('register', { name: name });
  }.bind(this));
};

/* Run */
Machinespark.oGameClient = new Machinespark.GameClient();
