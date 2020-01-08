var resultEl = $(".resultBox");
var resultE2 = $(".resultBox");
var resultE3 = $(".resultBox");
var resultE4 = $(".resultBox");
var resultE5 = $(".resultBox");

var cityInputEl = $(".cityBox");
var submitBtn = $("#submit");
<<<<<<< Updated upstream
=======
var establishmentchoice = $("#establishmentchoice");
>>>>>>> Stashed changes

$("#submit").on("click", function (event) {
    event.preventDefault();
<<<<<<< Updated upstream
    
    var city = cityInputEl.val();
    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=1&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var cityID = response.location_suggestions[0].id;
        var queryURL1 = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=20&apikey=0be82c0991914e9afe82f36e7fbdf1e6";
        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
                console.log(response.restaurants[Math.floor(Math.random() * 20) + 1].restaurant.name);
        });
    });
});


=======

    var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city="
    var city = cityInputEl.val();
    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=1&apikey=0be82c0991914e9afe82f36e7fbdf1e6";
    
    if (establishmentchoice[0].value === "Brewery") {
        $.ajax({
            url: breweryAPI + cityInputEl[0].value,
            method: "GET"
        }).then(function (response) {
            var brewery = response[0]
            resultEl.append(`Name ${brewery.name}`)
            resultE2.append(`Phone ${brewery.phone}`)
            resultE3.append(`Street ${brewery.street}`)
            resultE4.append(`City ${brewery.city}`)
            resultE5.append(`State ${brewery.state}`)
        });
    }
    if (establishmentchoice[0].value === "Restaurant") {
    }
});
>>>>>>> Stashed changes
