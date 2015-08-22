angular.module('marketmonitor')
	.service('moment', function($window) {
		return $window.moment;
	});