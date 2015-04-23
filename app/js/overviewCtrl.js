dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.dinner = function(){
  	return Dinner.getFullMenu();
  }

  $scope.total = function(){
  	return Dinner.getTotalMenuPrice();
  }

  $scope.deleteDish = function(dish){
  	Dinner.removeDishFromMenu(dish);
  }

  $scope.dishPrice = function(dish) {
  	return Dinner.PriceDish(dish);
  }
  $scope.addDish = function(dish){
  	Dinner.addDishToMenu(dish);
  }

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

});