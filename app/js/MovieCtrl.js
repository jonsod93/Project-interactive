movieDatabaseApp.controller('MovieCtrl', function ($scope,$routeParams,Model) {
  
  var ID = $routeParams.id;
  var Type = "movie";
  $scope.loading = function() {
   $scope.status = "Loading...";
   Model.Movie.get({type:Type,id:ID},function(data){
     $scope.movie=data;
     $scope.status = data.title;
   },function(data){
     $scope.status = "There was an error";
   });
 }
  $scope.loading();

  $scope.youtube =function(ending){
    if (ending != null | "" | undefined){
      var urlen = 'https://www.youtube.com/embed/';
      urlen += ending;
      $("#youtube").attr("src", urlen);
    }
  }

  $scope.addToFavourite = function(movie) {
  Model.addToFavourites(movie);
  
 }

});