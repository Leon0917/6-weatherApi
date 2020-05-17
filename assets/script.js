 // This is our API key for Open weather
 var APIKey = "cb0aff65346ac00102a9d531dc96584f";

 // Declaring the city 
 var city = $("city").val();
 $(document).ready(function() {
   $("#weatherSubmit").on("click", function() {
    var searchItem = $('#citySearch').val();
    console.log(searchItem)
    updatedWeather(searchItem)
    fiveDayForecast(searchItem)  
    if (!cities.includes(searchItem)){
      cities.push(searchItem)
    }
    localStorage.setItem('searches', JSON.stringify(cities))
   })
 })

 function updatedWeather(searchItem){
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchItem + '&appid=' + APIKey+"&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET"})
    .then(function(response) {
     
     console.log(response)
     $("#curWeather").append(searchItem)
     $("#weatherData").prepend("<p> Current Weather:" + response.main.temp +"</p>"
     +"<p>Description: "+response.weather[0].description+"</p>"+
     "<img src='https://openweathermap.org/img/wn/"+response.weather[0].icon+".png'"+
     "<p>wind speed:"+ response.wind.speed+"</p>")
     uvIndex(response.coord.lon,response.coord.lat)
    })
 }
 function fiveDayForecast(searchItem){
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchItem + '&appid=' + APIKey+"&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET"})
    .then(function(response) {
     console.log(response)
     for(let i = 0; i< response.list.length; i = i+8){
       
     $(".forecast").append("<div class='card'> <p>Forecast" + response.list[i].main.temp +"</p>"
     +"<p>Description: "+response.list[i].weather[0].description+"</p>"+
     "<img style='width:100px;' src='https://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png'"+ "/><h6>"+response.list[i].dt_txt+"</h6>"+
     "<p>wind speed:"+ response.list[i].wind.speed+"</p></div>")
     }
  })
 }
 function uvIndex(long,lat){
   console.log(lat,long)
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+long;
  $.ajax({
    url: queryURL,
    method: "GET"})
    .then(function(response) {
     console.log(response)
     $(".uv").append("UV INDEX:"+response.value)

 })
}

var cities =[];
function cities(){
  var storedCities = JSON.parse(localStorage.getItem("searches"))
  cities = storedCities
}
cities

// $("#searches").click(function cities (){
//   $("#seaches").append("<b>placeHolders</b>")
//   console.log(cities)
// })