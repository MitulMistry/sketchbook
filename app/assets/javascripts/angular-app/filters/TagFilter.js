function TagFilter(){

  return function(sketches, tagId){

    return sketches.filter(function(sketch){
      
      if(tagId) {
        var tagIds = sketch.tags.map(function(tag) {
          return tag.id;
        });
      
        return tagIds.includes(tagId);
      } else { //tagId must be null, so return true for all
        return true;
      }
      
    });
  };

}

angular
  .module('app')
  .filter('tagFilter', TagFilter);