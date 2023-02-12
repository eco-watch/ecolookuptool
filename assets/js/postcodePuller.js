// Set API key and endpoint
let apiKey = "j5vtabUijUO7Edl6aMAjeA38021";
let addressEndpoint = postcode => `https://api.getAddress.io/find/${postcode}?api-key=${apiKey}`;

// Ask user for postcode
document.querySelector("#searchButton").addEventListener("click", function (event) {
  event.preventDefault();
  let inputPostcode = document.querySelector("#postcodeInput");
  // Trim, uppercase, and remove spaces from postcode to reduce user error
  let postcode = inputPostcode.value.trim().toUpperCase().replace(/\s/g, "");
  // Get address data from API
  axios
    .get(addressEndpoint(postcode))
    .then(response => {
      // Create dropdown menu and add addresses
      let dropdown = document.createElement("select");
      dropdown.classList.add("form-control");
      response.data.addresses.forEach(address => {
        let option = document.createElement("option");
        let addressParts = address.split(",").filter(part => part.trim() !== "");
        let formattedAddress = "";
        for (let i = 0; i < addressParts.length; i++) {
          if (addressParts[i].trim() !== "") {
            formattedAddress += addressParts[i].trim();
            if (i < addressParts.length - 1) {
              formattedAddress += ", ";
            }
          }
        }
        option.value = formattedAddress + ", " + postcode;
        option.innerText = address;
        dropdown.appendChild(option);
      });
      // Remove previous dropdown menu if it exists
      let formGroup = document.querySelector(".form-group");
      let previousDropdown = formGroup.querySelector("select");
      if (previousDropdown) {
        formGroup.removeChild(previousDropdown);
      }
      // Replace input with dropdown menu
      formGroup.replaceChild(dropdown, inputPostcode);
      // Redirect to results page when option is selected
      dropdown.addEventListener("change", function () {
        let submitButton = document.createElement("button");
        submitButton.innerText = "Statistics";
        submitButton.classList.add("btn", "btn-success", "ml-2");
        submitButton.addEventListener("click", function () {
          window.location.href = "results.html";
        });
        // Replace search button with submit button
        formGroup.removeChild(document.querySelector("#searchButton"));
        formGroup.appendChild(submitButton);
        // Create clear button
        let clearButton = document.createElement("button");
        clearButton.innerText = "Clear";
        clearButton.classList.add("btn", "btn-secondary", "ml-2");
        clearButton.addEventListener("click", function() {
          formGroup.removeChild(dropdown);
          formGroup.appendChild(inputPostcode);
          formGroup.removeChild(addressResultsButton);
          formGroup.removeChild(clearButton);
          formGroup.appendChild(document.querySelector("#searchButton"));
        });
        // Add "Address results" button to form group
        let addressResultsButton = document.createElement("button");
        addressResultsButton.innerText = "Address results";
        addressResultsButton.classList.add("btn", "btn-success", "ml-2");
        addressResultsButton.addEventListener("click", function() {
          window.location.href = "https://www.google.com/";
        });
        formGroup.appendChild(addressResultsButton);
        // Add clear button to form group
        formGroup.appendChild(clearButton);
        });
        })
        .catch(error => {
          console.error(error);
        
          let invalidPostcodeButton = document.createElement("button");
          invalidPostcodeButton.innerText = "Invalid Postcode - click to try again";
          invalidPostcodeButton.classList.add("btn", "btn-danger", "ml-2");
          invalidPostcodeButton.addEventListener("click", function() {
            formGroup.removeChild(invalidPostcodeButton);
            formGroup.appendChild(document.querySelector("#searchButton"));
          });
        
          let formGroup = document.querySelector(".form-group");
          formGroup.appendChild(invalidPostcodeButton);
        });
        });
        