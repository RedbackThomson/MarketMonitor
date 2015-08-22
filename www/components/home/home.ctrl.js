angular.module('marketmonitor')

  .controller('HomeCtrl', ['$scope', '$interval', 'Markets', 'moment',
    function($scope, $interval, Markets, moment) {

    var init = function() {
      $scope.date = new Date();
      $scope.markets = Markets.all();
      updateStates();
    };

    var updateStates = function() {
      var now = moment();
      var utc = moment.utc();
      angular.forEach($scope.markets, function(value) {
        value.localMoment = now.tz(value.timezone).clone();
        value.state = Markets.getState(utc, value);
        console.log(value.name);
      });
    };

    $interval(function () { $scope.date = Date.now(); }, 1000)
    $interval(function () { updateStates(); }, 1000)
    init();
  }]);