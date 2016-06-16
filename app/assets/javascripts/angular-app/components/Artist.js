var Artist = { //defining an angular component (through setting an object) - Could also use a directive
  templateUrl: 'artists/artist.html', //sets html template to be used
  bindings: { //define arguments being passed to component - bindings for components, scope for directives
    data: '=' //set id to a variable being passed in, i.e. when used: <item id="post"></item>
  },
  controller: function() { //adding functionality to a controller for this component, injecting PostsService dependency
    var ctrl = this;
    //console.log(ctrl.data);
  },
  controllerAs: 'artist' //sets controller to be refered to as artist in the template
};

angular
  .module('app') //within module 'app'
  .component('artist', Artist); //defining this angular component - lowercase string name because no capitalization in DOM element when this component is used
