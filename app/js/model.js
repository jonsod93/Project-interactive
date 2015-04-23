movieDatabaseApp.factory('Model',function ($resource, $cookieStore) {
  

  this.MovieSearch = $resource('https://api.themoviedb.org/3/search/movie?api_key=4b3341cb55f94b0fdd61710e50ede0d2');
  this.Movie = $resource('https://api.themoviedb.org/3/movie/:id?api_key=4b3341cb55f94b0fdd61710e50ede0d2&append_to_response=trailers');
  this.topListed = $resource('https://api.themoviedb.org/3/movie/top_rated?api_key=4b3341cb55f94b0fdd61710e50ede0d2');
  this.popListed = $resource('https://api.themoviedb.org/3/movie/popular?api_key=4b3341cb55f94b0fdd61710e50ede0d2');
  this.recommended = $resource('https://api.themoviedb.org/3/movie/:id/similar?api_key=4b3341cb55f94b0fdd61710e50ede0d2');
  
  var Type = "movie";
  var recList = [];
    this.updateRec = function(){
    recList = [];
    for (var j=0;j<favourites.length;j++){
      var ID = favourites[j].id;
      this.recommended.get({id:ID},function(data){
        var rec = data.results;
        for (var i=0;i<3;i++){
          if (rec[i] != null){
            recList.push(rec[i]);
          }
        }
      });
    }
    }

    this.returnRec = function(){
      if (recList.length != 0){
      for (var i=recList.length-1;i>0;i--){
        for (var l=0;recList.length>l;l++){
          if (recList[i] != undefined && recList[l] != undefined){
          if (recList[i].id === recList[l].id && i != l){
            console.log("DUBBEL");
            recList.splice(i,1);
          }
          }
          }
        }
      }
      return recList;
    }

  var favourites = [];
  if($cookieStore.get('favourites')){
    var IDfavourites = $cookieStore.get('favourites');
    for (var i = 0;i<IDfavourites.length;i++){
      this.Movie.get({id:IDfavourites[i]}, function(data){
        var movie = data;
        favourites.push(movie);
      });
      } 
    }

    this.returnFavourites = function(){
      return favourites;
    }

    this.shorten = function(word){
      if (word.length>21){
        return word.substr(0,21)+"...";
      }
      else;
        return word;
    }

    this.returnTop = function(){
      //return this.removeWhenFavourite(topList);
      return topList;
    }

    this.returnPop = function(){
      return this.removeWhenFavourite(popList);
    }

  this.addToFavourites = function(movie){
    for (var u=0;u<favourites.length;u++){
      if(favourites[u].id === movie.id){
        favourites.splice(u,1);
      }
    }
    favourites.push(movie);
    var IDs =[];
    for (var u=0;u<favourites.length;u++){
    IDs.push(favourites[u].id);
    }
    $cookieStore.put('favourites',IDs);
    console.log($cookieStore.get('favourites'));
  }

   this.removeFromFavourites = function(movie) {
    if (favourites.length != 0){
   for (u=0;u<favourites.length;u++){
     if (favourites[u].id === movie.id){
       favourites.splice(u,1);
     }
     }
 }
   var IDs =[];
   for (var u=0;u<favourites.length;u++){
     IDs.push(favourites[u].ID);
   }
   $cookieStore.put('favourites',IDs);
   }

  return this;
});