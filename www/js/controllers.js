angular.module('marketmonitor.controllers', ['marketmonitor.services'])

.controller('HomeCtrl', ['$scope', '$interval', 'Markets',
  function($scope, $interval, Markets) {
  $scope.markets = Markets.all();
  $scope.date = new Date();

  var updateStates = function() {
    var now = moment();
    var utc = moment.utc();
    angular.forEach($scope.markets, function(value) {
      value.localTime = now.tz(value.timezone).format('H:mm');
      value.state = Markets.getState(utc, value);
    });
  };

  $interval(function () { $scope.date = Date.now(); }, 1000)
  $interval(function () { updateStates(); }, 1000)
  updateStates();
}])

.controller('SettingsCtrl', function($scope) {
  
});
