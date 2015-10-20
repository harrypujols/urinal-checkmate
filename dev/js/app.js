

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev, target) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
  checkMate(target.id);
}

function checkMate(el) {
  if (el == 'correct') {
    console.log('correct!');
  } else {
    console.log('nothing');
  }
}


var app = angular.module('urinal-chess', []);

app.controller('uctrl', function($scope, $http) {

  $http.get('data/data.json')
  .then(function(result){
    $scope.page = result.data.page;
    $scope.restroom = result.data.restroom;
  },

  function(error) {
    console.log('There was an error :(');
  });

  $scope.range = function(min, max, step){
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) input.push(i);
    return input;
  };

});
