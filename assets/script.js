 // This is our API key
 var APIKey = "cb0aff65346ac00102a9d531dc96584f";
 // Declaring the city 
 var city = $("city").val();

 // Here we are building the URL we need to query the database
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;

 // Here we run our AJAX call to the OpenWeatherMap API
 $.ajax({
   url: queryURL,
   method: "GET"})
   .then(function(response) {
    console.log(response)
   })
   
   $("#show").html();