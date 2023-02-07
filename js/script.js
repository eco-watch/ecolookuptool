
// Get the postcode from the input field
let postcode = document.getElementById("postcode").value;



let apiKey = ""; // insert api key here
let addressEndpoint = (`https://api.getAddress.io/find/${postcode}?api-key={$apiKey}`); 

