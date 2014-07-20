## AngularWeather ##

**AngularWeather** is a simple weather app built on [angularJS](https://angularjs.org/). It consumes [OpenWeatherMap](http://openweathermap.org/) API for all weather related data.

[DEMO](http://weather.prashantpalikhe.com)

### App information ###

App is built as a result of experimenting with AngularJS.

It simply displays the current weather condition for the city given by the user along with a week forecast. The units can be switched between metric and imperial.

If no city is given, the app tries to load the user's local weather data using HTML5 Geo-location API.

The app updates the route according to the city entered by the user and is therefore bookmarkable.

e.g. [http://weather.prashantpalikhe.com/#/toronto]()

### Developers information ###

[SASS](http://sass-lang.com/) is used for CSS preprocessing and modularized with [Smacss](http://smacss.com/) approach.

[GruntJS](http://gruntjs.com/) is used for automating building of static assets. It compiles SASS files, concatenates CSS & JS files, minifies them, autoprefixes CSS file and dumps them all in the release directory. So, release directory can be left untouched while developing.

Live reload is also supported via `grunt-watch` grunt task.

Run `grunt watch` before developing and you are good to go.
