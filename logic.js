var resultEl = $(".resultBox");
var formEl = $("#input-form");
var cityInputEl = $("#city-input");
var selectStateEl = $("#state-select");
var selectTypeEl = $("#type-select");
var submitBtn = $("#submit");
var errorText = $("<p>").text("Please fill out all required fields!");

$("#submit").on("click", function(event) {
    event.preventDefault();

    if(cityInputEl.val() === "" || selectStateEl.val() === "Select State" || selectTypeEl.val() === "Select Restaurant or Brewery"){
        // var errorText = $("<p>").text("Please fill out all required fields!");
        errorText.attr("style", "color: red");
        formEl.append(errorText);
        return;
    };
    errorText.remove();
    $("#submit").text("Not Satisfied? Click Next!");
    // AJAX query to get city code based on user input (city code needed to do further search)
    var city = cityInputEl.val();
    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=1&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // AJAX query using city code pulled from above to search restaurant options
        var cityID = response.location_suggestions[0].id;
        var queryURL1 = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=20&cusines=&apikey=0be82c0991914e9afe82f36e7fbdf1e6";
        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
                var randomNum = Math.floor(Math.random() * 20 + 1);
                
                var restName = $("<h5>").text(response.restaurants[randomNum].restaurant.name);
                var restType = $("<h6>").text("Type of Food: " + response.restaurants[randomNum].restaurant.cuisines)
                var restAddr = $("<h6>").text("Address: " + response.restaurants[randomNum].restaurant.location.address);
                var restPhone = $("<h6>").text("Phone Number: " + response.restaurants[randomNum].restaurant.phone_numbers);
                var restHours = $("<h6>").text("Hours: " + response.restaurants[randomNum].restaurant.timings);
                var restPrice = $("<h6>").text("Price Range: " + response.restaurants[randomNum].restaurant.price_range + "/4");
                var restRtng = $("<h6>").text("User Rating: " + response.restaurants[randomNum].restaurant.user_rating.aggregate_rating + "/5");
                var restUrl = $("<a>").text("Link to Website");
                restUrl.attr("href", response.restaurants[randomNum].restaurant.url);
                restUrl.attr("target", "_blank");
                var lineBreak = $("<br>");

                $(".resultBox").empty();
                
                $(".resultBox").append(restName, restType, restAddr, restPhone, restHours, restPrice, restRtng, restUrl, lineBreak);
        });
    });
    // Add functionality to STOP submit button from working after clicking once. Tried "return" - did not work
});


