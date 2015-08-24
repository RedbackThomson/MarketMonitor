angular.module('marketmonitor')

  .controller('SettingsCtrl', ['$scope', '$interval', 'Markets', '$localstorage',
    function($scope, $interval, Markets, $localstorage) {
      $scope.markets = Markets.all();

      $scope.delayChange = function (delay) {
        $localstorage.set('marketDelay', delay);
      }

      $scope.marketEnabled = function(market) {
        return $scope.selectedMarkets.indexOf(market.abbreviation) !== -1;
      }

      $scope.toggleMarket = function (market, toggle) {
        if(toggle)
          ($scope.selectedMarkets).push(market.abbreviation);
        else
        {
          var index = ($scope.selectedMarkets).indexOf(market.abbreviation);
          ($scope.selectedMarkets).splice(index, 1);
        }
        $localstorage.setObject('selectedMarkets', $scope.selectedMarkets);
      }

      function init() {
        $scope.marketDelay = $localstorage.get('marketDelay', 5);
        $scope.selectedMarkets = $localstorage.getObject('selectedMarkets', []);
      }

      init();
  }]);