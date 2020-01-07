// Get results for desired restaurant of brewery selection by clicking this button
function getResults() {
// Display restaurant/brewery info
}
var resultEl = $(".resultBox");
var cityInputEl = $(".cityBox");
var submitBtn = $("#submit");

$("#submit").on("click", function(event) {
    event.preventDefault();
    
    var city = cityInputEl.val();
    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=1&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.location_suggestions[0].id);
    });
});


