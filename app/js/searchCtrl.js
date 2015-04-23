movieDatabaseApp.controller('SearchCtrl', function ($scope,Model) {
	$scope.showToplist = true;
	$scope.showPoplist = false;
	$scope.showReclist = false;
	$scope.searchDiv = false;
	
	$scope.showRec = function() {
		$scope.showReclist = true;
		$scope.showToplist = false;
		$scope.searchDiv = false;
		$scope.showPoplist = false;
	}
	$scope.showTop = function() {
		$scope.showReclist = false;
		$scope.showToplist = true;
		$scope.searchDiv = false;
		$scope.showPoplist = false;
	}
	$scope.showPop = function() {
		$scope.showReclist = false;
		$scope.showPoplist = true;
		$scope.showToplist = false;
		$scope.searchDiv = false;
	}
	$scope.showSearched = function() {
		$scope.showReclist = false;
		$scope.showPoplist = false;
		$scope.showToplist = false;
		$scope.searchDiv = true;
	}

	$scope.shorten = function(word){
		return Model.shorten(word);
	}

   $scope.search = function(searched) {
   $scope.status = "Searching...";
   Model.MovieSearch.get({query:searched},function(data){
     $scope.movies=data.results;
     $scope.status = "Showing results";
   },function(data){
     $scope.status = "There was an error";
   });
 }

 $scope.likeSearched = function(){
 	$scope.movies = $scope.removeWhenFavourite($scope.movies);
 }

 $scope.topMovies = function() {
 	Model.topListed.get(function(data){
       	$scope.topList = $scope.removeWhenFavourite(data.results);
   });
 }
 $scope.topMovies();

   $scope.popMovies = function() {
 	 	Model.popListed.get(function(data){
       	$scope.popList = $scope.removeWhenFavourite(data.results);
       	//$scope.popList = Model.removeWhenFavourite(data.results;);
   });
 }

     $scope.removeWhenFavourite = function(list){
     var favourites = Model.returnFavourites();
      if (list.length != 0){
      for (var i=list.length-1;i>=0;i--){
        for (var l=0;favourites.length>l;l++){
        if (list[i] != undefined && favourites[l] != undefined){
          if (list[i].id === favourites[l].id){
            list.splice(i,1);
            console.log("HEJ2");
          }
      	}
        }
      }
    }
      return list;
    }

 $scope.favourites = function() {
 	return Model.returnFavourites();
 }

 $scope.recommended = function() {
 	return $scope.removeWhenFavourite(Model.returnRec());
 }

 $scope.updateRec = function(){
 	Model.updateRec();
 }

 $scope.addToFavourite = function(movie) {
 	Model.addToFavourites(movie);
 	
 }

 $scope.removeFromFavourites = function(movie) {
 	Model.removeFromFavourites(movie);
 }

});