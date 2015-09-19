console.log('Hello from the console!')

var app = angular.module('urinal-chess', ['ngDragDrop']);

app.controller('uctrl', function($scope, $http) {

    $http.get('/data/index.json')
    .then(function(result){
      $scope.json = result.data;
    });

});
