/*
  Exposed Events:
    - onPlay (name)
*/
Machinespark.GameJoin = function () {  
  this.jqGameJoin  = $('#gamejoin');
  this.jqNameField = this.jqGameJoin.find('.txtname');

  this.jqGameJoin.show()//.modal();

  // Exposed Events
  this.onPlay = new Machinespark.Event();

  // Button Click: Play
  this.jqGameJoin.find('.btnplay').live('click', function (e) {
    if (!this.jqNameField.val().length) {
      alert('Who are you? <3');
    }

    this.onPlay.fire(this.jqNameField.val());
  }.bind(this));

  return this;
};

Machinespark.GameJoin.prototype.hide = function () {
  this.jqGameJoin.hide();
  return this;
};
