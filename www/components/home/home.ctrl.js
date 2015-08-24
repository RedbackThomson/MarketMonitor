angular.module('marketmonitor')

  .controller('HomeCtrl', ['$scope', '$interval', 'Markets', 'moment', 'Notification', '$localstorage',
    function($scope, $interval, Markets, moment, Notification, $localstorage) {
    var enabledMarkets = [];

    var init = function() {
      $scope.date = new Date();
      $scope.markets = Markets.all();
      enabledMarkets = $localstorage.getObject('selectedMarkets', []);
      updateStates();
      Notification.add();
    };

    $scope.marketEnabled = function(market) {
      return enabledMarkets.indexOf(market.abbreviation) !== -1;
    }

    var updateStates = function() {
      var now = moment();
      var utc = moment.utc();
      angular.forEach($scope.markets, function(value) {
        value.localMoment = now.tz(value.timezone).clone();
        value.state = Markets.getState(utc, value);
      });
    };

    $interval(function () { $scope.date = Date.now(); }, 1000)
    $interval(function () { updateStates(); }, 1000)
    init();
  }]);