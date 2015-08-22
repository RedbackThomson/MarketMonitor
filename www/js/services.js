angular.module('marketmonitor.services', ['marketmonitor.config'])

.factory('Markets', ['$http', 'config', function($http, config) {
  var markets = [];
  var factory = {};

  factory.all = function() {
    return markets;
  };

  var minutesOfDay = function(m) {
    return m.minutes() + m.hours() * 60;
  }

  factory.getState = function(utcNow, market) {
    var utcDate = utcNow.date();
    var nowMinutes = minutesOfDay(utcNow);
    //Market times
    var open = moment(market.open);
    var close = moment(market.close);

    var openMinutes = minutesOfDay(open);
    var closeMinutes = minutesOfDay(close);

    //Lunch times
    var lunchStart = market.lunch_start !== null ? moment(market.lunch_start) : null;
    var lunchStop = market.lunch_stop !== null ? moment(market.lunch_stop) : null;

    //Time differences
    var openDiff = openMinutes - nowMinutes;
    var closeDiff = closeMinutes - nowMinutes;

    //Check holidays
    for(var i = 0; i < market.holidays.length; i++) {
      var holiday = moment(market.holidays[i]);

      if(holiday.isSame(utcDate))
        return "Holiday";
    }

    //Get Lunch
    if(lunchStart !== null && lunchStop !== null &&
      nowMinutes > minutesOfDay(lunchStart) && 
      nowMinutes < minutesOfDay(lunchStop))
      return "Lunch";

    if(openDiff <= config.MARKET_DELAY && openDiff > 0)
      return "Opening";

    if(closeDiff <= config.MARKET_DELAY && closeDiff > 0)
      return "Closing";

    if(openMinutes < closeMinutes)
      return (nowMinutes >= openMinutes && nowMinutes <= closeMinutes) ? 
        "Open" : "Closed";

    return (nowMinutes >= (openMinutes-24*60) && nowMinutes <= closeMinutes) ?
      "Open" : "Closed";
  };

  $http.get('markets/markets.json')
  .success(function (data) {
    markets.length = 0;
    markets.push.apply(markets, data);
  });

  return factory;
}]);