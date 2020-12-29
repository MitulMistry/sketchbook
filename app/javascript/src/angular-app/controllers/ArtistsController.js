function ArtistsController(artists) { //artists is injected from app.js resolve
  var ctrl = this;

  ctrl.artists = artists.data;
  
  ctrl.pageSize = 9;
}

ArtistsController.$inject = ['artists']; //explicit dependency injection for Webpack JS minification

angular
	.module('app')
	.controller('ArtistsController', ArtistsController);
