function ArtistController(artist) { //artist is injected from app.js resolve
  var ctrl = this;

  ctrl.artist = artist;
  console.log(artist);
  //ctrl.data = artist.data;
}

angular
	.module('app')
	.controller('ArtistController', ArtistController);
