function TagFilter(){

  return function(sketches, tagId){

    return sketches.filter(function(sketch){
      
      if (tagId) { //if the tag id being checked is not null
        var tagIds = sketch.tags.map(function(tag) { //collect all the tag ids associated with the sketch
          return tag.id;
        });
      
        return tagIds.includes(tagId); //check whether the collected tag ids include the tag we're checking for - returns true or false
      } else { //tagId must be null, so return true for all
        return true;
      }
      
    });
  };

}

angular
  .module('app')
  .filter('tagFilter', TagFilter);