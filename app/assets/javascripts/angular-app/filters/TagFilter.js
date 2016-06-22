function TagFilter(){
  return function(sketches, tag){

    return sketches.filter(function(sketch){
      return sketch.tags.includes(tag);
    });
  };
}

angular
  .module('app')
  .filter('tagFilter', TagFilter);