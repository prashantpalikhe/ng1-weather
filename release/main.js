/*! WeatherApp - v0.1.0 - 2014-07-19 */ 
var app=angular.module("weatherapp",[]).filter("climacon",function(){"use strict";var a={"01d":"sun","02d":"cloudSun","03d":"cloud","04d":"cloud","09d":"cloudDrizzleSun","10d":"cloudRainSun","11d":"cloudLightning","13d":"cloudSnow","50d":"cloudFog","01n":"moon","02n":"cloudMoon","03n":"cloud","04n":"cloud","09n":"cloudDrizzleMoon","10n":"cloudRainMoon","11n":"cloudLightning","13n":"cloudSnow","50n":"cloudFog"};return function(b){return a[b]}});app.controller("WeatherController",["$scope","$http",function(a,b){"use strict";var c="http://api.openweathermap.org/data/2.5/weather?q=",d="http://api.openweathermap.org/data/2.5/forecast/daily?count=7&q=";a.units="metric",a.city="",a.options={types:"(cities)"},a.details="",a.data={},a.resetData=function(){return a.data.weather=a.data.forecasts=a.data.error=void 0,a},a.fetchData=function(){var b=a.city;b&&a.resetData().fetchWeather(b).fetchForecast(b)},a.fetchWeather=function(d){var e=c+d+"&units="+a.units;return b.get(e).success(function(b){"404"===b.cod?a.data.error="No data found for "+a.city:(a.data.period=b.dt>b.sys.sunset||b.dt<b.sys.sunrise?"night":"day",a.data.weather=b.main,a.data.weather.icon=b.weather[0].icon)}),a},a.fetchForecast=function(c){var e=d+c+"&units="+a.units;return b.get(e).success(function(b){b.cnt&&(b.list.shift(),a.data.forecasts=b.list)}),a},a.toC=function(){a.units="metric",a.fetchData()},a.toF=function(){a.units="imperial",a.fetchData()}}]);