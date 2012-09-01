Machinespark.GameJoin = function () {
  var _self = this;
  
  // Modal: GameJoin
  _self.jqGameJoin           = $('#gamejoin');
  _self.jqGameJoin_btnPlay   = $('#btnPlay');
  _self.jqGameJoin.modal();

  _self.jqGameJoin.hide();

  function tryPlay (e) {
    var txtSessionID  = $('#txtSessionID').val(),
        txtAlias      = $('#txtAlias').val()

    if (!txtSessionID || !txtAlias) return false;

    _self.session = Machinespark.GameSession(txtSessionID, txtAlias);
    _self.jqGameJoin.hide();

    Machinespark.ThrobberToggle().on();
  }

  _self.jqGameJoin_btnPlay.live('click', tryPlay);
};
