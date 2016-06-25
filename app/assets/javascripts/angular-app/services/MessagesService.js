function MessagesService(Flash) {
  
  var duration = 3000;
  
  this.success = function(message) {
    Flash.create('success', message, duration);
  }

  this.info = function(message) {
    Flash.create('info', message, duration);
  }

  this.warning = function(message) {
    Flash.create('warning', message, duration);
  }

  this.danger = function(message) {
    Flash.create('danger', message, duration);
  }
  
  this.displayError = function(errorObj) { //receives array of error messages from rails: @model.errors.full_messages, or Devise errors
  
  for (var error in errorObj) {
    
  }
    this.danger(errorObj);
  }
}

angular
  .module('app')
  .service('MessagesService', MessagesService);
