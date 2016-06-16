function ArtistsController(artists) { //artists is injected from app.js resolve
  var ctrl = this;

  ctrl.artists = artists.data;
}

angular
	.module('app')
	.controller('ArtistsController', ArtistsController);
