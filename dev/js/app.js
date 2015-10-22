
var app = angular.module('urinal-chess', []);

// drag
app.directive('draggable', function() {
  return function(scope, element) {
    var el = element[0];

    el.draggable = true;

    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );

    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
});

// drop
app.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '='
    },

    link: function(scope, element) {
      var el = element[0];

      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'drop',
        function(e) {
          if (e.stopPropagation) e.stopPropagation();

          this.classList.remove('over');

          var binId = this.id;
          var item = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(item);
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {
              fn(item.id, binId);
            }
          });

          return false;
        },
        false
      );
    }
  }
});

app.controller('uctrl', function($scope, $http, $location) {

  $http.get('data/data.json')
  .then(function(result){
    $scope.page = result.data.page;
    $scope.restroom = result.data.restroom;
  },

  function(error) {
    console.log('There was an error :(');
  });

  $scope.location = $location;
  $scope.$watch('location.search()', function() {
    $scope.stage = ($location.search()).stage;

    if ($scope.stage == undefined) {
      $scope.stage = 0;
    }

  }, true);

  $scope.changeTarget = function(name) {
    $location.search('stage', name);
  }

  $scope.continue = false;

  $scope.range = function(min, max, step){
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) input.push(i);
    return input;
  };

  $scope.result = function(man, urinal) {

    if (urinal == 'correct') {
      $scope.page.message = 'checkmate';
      $scope.continue = true;
    } else {
      $scope.page.message = 'wrong';
      $scope.continue = false;
    }

  }

  $scope.changeround = function() {

    if ($scope.stage >= $scope.restroom.length) {
      $scope.stage = 0;
    } else {
      $scope.stage++;
    }

    location.reload();
  }

});
