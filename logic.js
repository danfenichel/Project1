var resultEl = $(".resultBox");

var formEl = $("#input-form");

var cityInputEl = $("#city-input");

var selectStateEl = $("#state-select");

var selectFoodEl = $("#food-select");

var submitBtn = $("#submit");

var matchBtn = $("#match");

var errorText = $("<p>").text("Please fill out all required fields!");

// CHANGED establishmenttype to type-select

var typeSelect = $("#type-select");

var counter = 0;

// Hides the cuisine select box when user selects "Brewery"
typeSelect.on("change", function () {
    if (typeSelect.val() === "Brewery") {
        $(".test-select").attr("style", "display:none");
    } else { $(".test-select").attr("style", "display:block") };
});

// Make resultBox appear when submit button is clicked
function seeAnswer() {
    console.log("Make results appear")
    var resResult = document.getElementById("resultsDiv");
    resResult.style.display = "block";
}

// Empty fields error message

$("#submit").on("click", function (event) {

    event.preventDefault();

    // Shows Error Text if required fields aren't populated

    if (cityInputEl.val() === "" || selectStateEl.val() === "Select State" || typeSelect.val() === "Select Restaurant or Brewery") {

        errorText.attr("style", "color: red; text-align: center; font-weight: 900; background: rgba(255,255,255, 0.7); width: 300px; border-radius: 25px; margin: 0 auto");

        formEl.append(errorText);

        return;

    };

    // Removes error text once required fields are populated

    errorText.remove();

    // Changes text of submit button to tell users to keep cycling through to next options
    submitBtn.attr("style", "color: white; font-weight: bold; border-color: white");
    $("#submit").text("New Result!");

    // Adds match button if user decides on option; brings user to Open Table to make reservation
    var matchBtn = $("<button>");
    matchBtn.attr("class", "button is-dark");
    matchBtn.text("Reserve Table");
    matchBtn.attr("style", "color: red; font-weight: bold; border-color:white");

    // Makes it so the match button doesn't keep appending with successive clicks
    if (counter <= 0) {
        $("#button-field").append(matchBtn);
        counter++;
    };

    // Match button directs user to Open Table with restaurant name filled in the search box
    matchBtn.on("click", function(event){
        var restaurantName = $("h5").text();
        console.log(restaurantName);
        event.preventDefault();
        window.open(`https://www.opentable.com/s/?term=${restaurantName}&includeTicketedAvailability=true`)
    });

    // AJAX query to get city code based on user input (city code needed to do further search)

    var city = cityInputEl.val();

    switch (typeSelect.val()) {

        case "Restaurant":

            showRestuarant(city)

            break;

        case "Brewery":

            showBrewery(city)

            break;

        default:

    };

});

function showBrewery(city) {

    var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city="

    $.ajax({

        url: breweryAPI + city,

        method: "GET"

    }).then(function (response) {

        console.log(response.length);

        var brewery = response[Math.floor(Math.random() * Math.floor(20))]

        resultEl.empty();

        resultEl.append(`

          <h2>${brewery.name}</h2>

          <h6>Address: ${brewery.street} ${brewery.city} ${brewery.state}</h6>

          <h6>Phone Number: ${brewery.phone}</h6>

          <h6><a href="${brewery.website_url}" target="_blank">Link to Website</a></h6>

          `);

    });

};

function showRestuarant(city) {

    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=1&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

    $.ajax({

        url: queryURL,

        method: "GET"

    }).then(function (response) {

        // AJAX query using city code pulled from above to search random restaurant options

        var cityID = response.location_suggestions[0].id;

        var cuisineID = $("#food-select").val();

        var queryURL1 = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=20&cuisines=" + cuisineID + "&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

        $.ajax({

            url: queryURL1,

            method: "GET"

        }).then(function (response) {

            var randomNum = Math.floor(Math.random() * 20 + 1);

            var restaurant = response.restaurants[randomNum].restaurant

            var restName = $("<h2>").text(restaurant.name);

            var restType = $("<h6>").text("Cuisine Type: " + restaurant.cuisines)

            var restAddr = $("<h6>").text("Address: " + restaurant.location.address);

            var restPhone = $("<h6>").text("Phone Number: " + restaurant.phone_numbers);

            var restHours = $("<h6>").text("Hours: " + restaurant.timings);

            var restRtng = $("<h6>").text("User Rating: " + restaurant.user_rating.aggregate_rating + "/5");

            var restUrl = $("<a>").text("Link to Website");

            restUrl.attr("href", restaurant.url);

            restUrl.attr("target", "_blank");
            
            restUrl.attr("class", "web-link");

            var lineBreak = $("<br>");

            $(".resultBox").empty();

            $(".resultBox").append(restName, restType, restAddr, restPhone, restHours, restRtng, restUrl, lineBreak);

        });

    });

};