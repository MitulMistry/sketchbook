function ArtistsController(artists) { //artists is injected from app.js resolve
  var ctrl = this;

  ctrl.artists = artists;
}

angular
	.module('app')
	.controller('ArtistsController', ArtistsController);
