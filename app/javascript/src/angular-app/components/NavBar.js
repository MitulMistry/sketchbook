import navbarTemplate from '../../templates/navbar.html';

var NavbarComponent = { //defining an angular component (through setting an object) - Could also use a directive
  template: navbarTemplate, //sets html template to be used
  bindings: { //define arguments being passed to component - bindings for components, scope for directives
    data: '=' //set data to a variable being passed in, i.e. when used: <item id="post"></item>
  },
  controller: function($state) { //can add functionality to a controller for this component by injecting dependencies such as a service
    var ctrl = this;
  },
  controllerAs: 'navbar' //sets controller to be refered to as footer in the template
};

angular
  .module('app') //within module 'app'
  // .component('footer', {template: footer}); //defining this angular component - lowercase string name because no capitalization in DOM element when this component is used
  .component('navbarcomponent', NavbarComponent); //defining this angular component - lowercase string name because no capitalization in DOM element when this component is used