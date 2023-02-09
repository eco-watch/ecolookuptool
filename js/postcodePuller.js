
//set variables
let axios = require("axios");
let readline = require("readline").createInterface({
//set input and output methods for the readline interface
  input: process.stdin,
  output: process.stdout
});

//set api key and endpoint
let apiKey = "1AzPegcMMkOQVoBwvo0EFQ37970";
let addressEndpoint = postcode => `https://api.getAddress.io/find/${postcode}?api-key=${apiKey}`;

//ask user for postcode
readline.question("Enter a postcode: ", inputPostcode => {
//trim, uppercase and remove spaces from postcode to reduce user error
  let postcode = inputPostcode.trim().toUpperCase().replace(/\s/g, "");
//get address data from api
  axios
    .get(addressEndpoint(postcode))
    .then(response => {
//log all addresses to console
      response.data.addresses.forEach(address => {
        console.log(
          address
            .split(",")
            .filter(part => part.trim() !== "")
            .join(",") +
            ", " +
            postcode
        );
      });
      readline.close();
    })
//log any errors to console
    .catch(error => {
      console.error(error);
      readline.close();
    });
});