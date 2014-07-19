/*! WeatherApp - v0.1.0 - 2014-07-19 */ 
var app=angular.module("weatherapp",["ngRoute"]);app.config(["$routeProvider",function(a){"use strict";a.when("/",{controller:"WeatherController",templateUrl:"weatherapp-index.html"}).when("/:city",{controller:"WeatherController",templateUrl:"weatherapp-index.html"}).otherwise({redirectTo:"/"})}]),app.filter("climacon",function(){"use strict";var a={"01d":"sun","02d":"cloudSun","03d":"cloud","04d":"cloud","09d":"cloudDrizzleSun","10d":"cloudRainSun","11d":"cloudLightning","13d":"cloudSnow","50d":"cloudFog","01n":"moon","02n":"cloudMoon","03n":"cloud","04n":"cloud","09n":"cloudDrizzleMoon","10n":"cloudRainMoon","11n":"cloudLightning","13n":"cloudSnow","50n":"cloudFog"};return function(b){return a[b]}}),app.controller("WeatherController",["$scope","$http","$interval","$location",function(a,b,c,d){"use strict";var e="http://api.openweathermap.org/data/2.5/weather?q=",f="http://api.openweathermap.org/data/2.5/forecast/daily?count=7&q=";a.units="metric",a.city=d.path().replace(/^\/|\/$/g,""),a.options={types:"(cities)"},a.details="",a.data={},a.resetData=function(){return angular.isDefined(a.stop)&&(c.cancel(a.stop),a.stop=void 0),a.data.weather=a.data.forecasts=a.data.error=void 0,a},a.fetchData=function(){var b=a.city;b&&(d.path("/"+b),a.resetData().fetchWeather(b).fetchForecast(b))},a.fetchWeather=function(c){var d=e+c+"&units="+a.units;return b.get(d).success(function(b){"404"===b.cod?a.data.error="No data found for "+a.city:(a.data.weather=b,a.data.period=b.dt>b.sys.sunset||b.dt<b.sys.sunrise?"night":"day",a.data.weather.icon=b.weather[0].icon)}),a},a.fetchForecast=function(c){var d=f+c+"&units="+a.units;return b.get(d).success(function(b){b.cnt&&(b.list.shift(),a.data.forecasts=b.list)}),a},a.toC=function(){a.units="metric",a.fetchData()},a.toF=function(){a.units="imperial",a.fetchData()},a.fetchData()}]);