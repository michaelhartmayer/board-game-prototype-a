/* Application */
Machinespark.GameClient = function () {
  $(this.setup.bind(this));
};

Machinespark.GameClient.prototype.setup = function () {
  this.gameserver     = io.connect('http://76.176.40.244:8011'),
  this.gameJoinDialog = new Machinespark.GameJoinDialog();

  // on: register
  this.gameserver.on('register', function (jres) {
    if (jres.valid) {
      this.gameJoinDialog.hide();
    } else {
      alert(jres.message);
    }
  }.bind(this));

  // on: listplayers
  this.listPlayers = new Machinespark.ListPlayers();
  this.gameserver.on('listplayers', function (jres) {

  }.bind(this));

  // Register / Play Dialog
  this.gameJoinDialog.onPlay.subscribe(function (name) {
    this.gameserver.emit('register', { name: name });
  }.bind(this));
};

/* Run */
Machinespark.oGameClient = new Machinespark.GameClient();
