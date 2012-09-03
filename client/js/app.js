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

  // on: listplayers
  this.listPlayers = new Machinespark.ListPlayers();
  this.gameserver.on('listplayers', function (jres) {
    console.log(jres)
    this.listPlayers.updateList(jres);
  }.bind(this));

  // on: listgames
  this.listGames = new Machinespark.ListGames();
  this.gameserver.on('listgames', function (jres) {
    this.listGames.updateList(jres);
  });

  // on: test (for dev only)
  this.gameserver.on('test', function (jres) {
    console.log('TEST APPEARED!');
    console.log(jres);
  });

  // Register / Play Dialog
  this.gameJoin.onPlay.subscribe(function (name) {
    this.gameserver.emit('register', { 'name': name });
  }.bind(this));
};

/* Run */
Machinespark.oGameClient = new Machinespark.GameClient();
