
// Get the postcode from the input field
let postcode = document.getElementById("postcode").value;




// function to call the adress API when the user submits their postcode
function callAddressApi(postcode) {

    // api key for getAddress.io
    const apiKey = "1AzPegcMMkOQVoBwvo0EFQ37970 "; // insert api key here
    // define the api endpoint
    const addressEndpoint = ("https://api.getAddress.io/find/" + postcode + "api-key=" + apiKey);

    // console.log the endpoint
    console.log("Querying: " + addressEndpoint);


    fetch(addressEndpoint)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        // more code here
    });
}

// define a function to make a request to the EPC API
function callEpcApi(address) {

    // create the endpoint
    const endpoint = "https://epc.opendatacommunities.org/api/v1/domestic/search?address=" + address + "&postcode=" + postcode + "&size=" + size + "&from=" + from + dateRange;

    console.log("Querying " + endpoint)

    fetch(endpoint, {
        headers: {
            Accept: "application/json",
            Authorization: "Basic " + encodedApiKey
        }
    })
    .then(response => {
        // check the response type
        if (response.headers.get("content-type").includes("text")) {
            // response is in text format
            console.long("Response is in text format")
            return response.text();
        } else {
            // response is in JSON format
            console.log("Response is in JSON format")
            return response.json();
        }
    })
    .then(data => {
        try {
            // parse the response data
            const parsedData = JSON.parse(data);
            // use the parsed data as needed
            console.log("Parsed response data: ")
            console.log(parsedData);

        } catch (e) {
            console.error("Error parsing JSON: ", e);
            console.log("Response data: ", data);

        }
    })
}

// add event listener for the address for waiting for search addresses
document.getElementById("search-addresses").addEventListener("click", function() {
    callAddressApi(postcode);
});

// add event listener for the search epc button when user clicks on their address and presses get my epc data
document.getElementById("search-epc").addEventListener("click", function() {
    callEpcApi(address);
});
