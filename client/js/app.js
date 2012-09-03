/* Application */
Machinespark.GameClient = function () {
  $(this.setup.bind(this));
};

Machinespark.GameClient.prototype.setup = function () {
  this.gameserver     = io.connect('http://localhost:8011'),
  this.gameJoinDialog = new Machinespark.GameJoinDialog();

  this.gameserver.on('register', function (jres) {
    if (jres.valid) {
      this.gameJoinDialog.hide();
    } else {
      alert(jres.message);
    }
  }.bind(this));

  // Register / Play Dialog
  this.gameJoinDialog.onPlay.subscribe(function (name) {
    this.gameserver.emit('register', {name: name});
  }.bind(this));
};

/* Run */
Machinespark.oGameClient = new Machinespark.GameClient();
