// function to call the address API when the user submits their postcode
// function callAddressApi(postcode) {

//     // api key for getAddress.io
//     const apiKey = "1AzPegcMMkOQVoBwvo0EFQ37970 "; // insert api key here
//     // define the api endpoint
//     const addressEndpoint = ("https://api.getAddress.io/find/" + postcode + "&api-key=" + apiKey);

//     // console.log the endpoint
//     console.log("Querying: " + addressEndpoint);


//     fetch(addressEndpoint)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // get the addresses from the data
//         const addresses = data.addresses;

//         // loop through the addresses and add them to the dropdown
//         for (let i = 0; i < addresses.length; i++) {
//             // create a new option element
//             const option = document.createElement("option");
//             // set the value of the option to the address
//             option.value = addresses[i];
//             // set the text of the option to the address
//             option.text = addresses[i];
//             // add the option to the dropdown
//             document.getElementById("addresses").appendChild(option);
//         }

//         return addresses;
        
//         // more code here
//     });
// }

// function to call the EPC API when the user submits their address

function callEpcApi(address, postcode) {

    const encodedApiKey = "ZnJvbnRlbmRkZXZAc3RheWhvbWUubGk6M2U3MGM4YjYzMDhkZTQ0OWM3YmY4YzZhMTI4N2FiYTVjYzViNGE0MQ=="; // new api key
    const endpoint = `https://epc.opendatacommunities.org/api/v1/domestic/search?address=${address}&postcode=${postcode}`; // EPC endpoint
    
    console.log(`Querying ${endpoint}`);
    
    $.ajax({
        type: "GET",
        url: endpoint,
        headers: {
            Accept: "application/json",
            Authorization: "Basic " + encodedApiKey
        },
        success: function(data) {
            console.log("Response is in JSON format");
            console.log(data);
        },
        error: function(error) {
            console.error("Error parsing JSON: ", error);
    }
});
}

$(document).ready(function() {
    $("#test").click(function(event) {

        // prevent the form from submitting
        event.preventDefault();
        
        const address = $("#address").val();
        const postcode = $("#postcode").val();
        
        console.log(`Address: ${address} Postcode: ${postcode}`);
        callEpcApi(address, postcode);
    });
});
