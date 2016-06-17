// Version for ES5
(function() {

  var HttpClient = function() {
    this.get = function(url, callback) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200) {
          callback(httpRequest.responseText);
        }
      }
      httpRequest.open("GET", url, true);
      httpRequest.send(null);
    }
  };

  var request = new HttpClient();
  
  request.get("https://weathersync.herokuapp.com/ip", function(response) {
    // parse data object to extract long/lat
    var data = JSON.parse(response);
    var coords = { long: data.location.longitude, lat: data.location.latitude };
    // create url with coordinates to make subsequent get request
    var weatherUrl = "https://weathersync.herokuapp.com/weather/" + coords.lat + "," + coords.long;
      
    request.get(weatherUrl, function(response) {
      processWeatherData(response);
    });
  });

  function processWeatherData(response) {
    // parse weather data
        var data = JSON.parse(response);
        // convert temperature from Kelvin to Fahrenheit
        var temp = kelvinToFahrenheit(Number(data.main.temp));
        // pull icon from data object for concatenation
        var weatherIcon = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        // inject data into the DOM elements
        var locData = document.getElementById("location").innerHTML = data.name;
        var tempData = document.getElementById("temperature").innerHTML = String(temp) + "&deg" + "F" ;
        var iconData = document.getElementById("icon").src = iconUrl;
        var conditionData = document.getElementById("condition").innerHTML = data.weather[0].description;
  }
  // conversion function: Kelvin to Fahrenheit
  function kelvinToFahrenheit(temp) {
    return Math.floor(temp * 9/5 - 459.67);
  }

})();

// Version for ES2015
// (function() {

//   const HttpClient = function() {
//     this.get = (url, callback) => {
//       const httpRequest = new XMLHttpRequest();
//       httpRequest.onreadystatechange = () => {
//         if(httpRequest.readyState == 4 && httpRequest.status == 200) {
//           callback(httpRequest.responseText);
//         }
//       }
//       httpRequest.open("GET", url, true);
//       httpRequest.send(null);
//     }
//   }

//   const request = new HttpClient();
//   request.get("https://weathersync.herokuapp.com/ip", (response) => {
    
//     let data = JSON.parse(response);
//     let coords = { long: data.location.longitude, lat: data.location.latitude };
//     let weatherUrl = `https://weathersync.herokuapp.com/weather/${coords.lat},${coords.long}`;

//     request
//       .get(weatherUrl, (response) => {
//         processWeatherData(response);
//       });
//   });

//   function processWeatherData(response) {
//     let data = JSON.parse(response);  
//     let temp = kelvinToFahrenheit(Number(data.main.temp));
//     let weatherIcon = data.weather[0].icon;
//     let iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    
//     let locData = document.getElementById("location").innerHTML = data.name;
//     let tempData = document.getElementById("temperature").innerHTML = String(temp) + "&deg" + "F" ;
//     let iconData = document.getElementById("icon").src = iconUrl;
//     let conditionData = document.getElementById("condition").innerHTML = data.weather[0].description;
//   }

//   function kelvinToFahrenheit(temp) {
//     return Math.floor(temp * 9/5 - 459.67);
//   }

// })();