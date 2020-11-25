function MessagesService(Flash) {
  
  var duration = 5000;
  
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
  
  this.displayError = function(response) {
    if (response.data.error) { //devise error
      this.danger(response.data.error)
      
    } else if (response.data.errors) { //receives array of error messages from rails: @model.errors.full_messages, or Devise errors
      for (var i = 0; i < response.data.errors.length; i++) {
        this.danger(response.data.errors[i]);
      }
    }
  }
}

angular
  .module('app')
  .service('MessagesService', MessagesService);
