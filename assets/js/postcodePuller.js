//set api key and endpoint
let apiKey = "1AzPegcMMkOQVoBwvo0EFQ37970";
let addressEndpoint = postcode => `https://api.getAddress.io/find/${postcode}?api-key=${apiKey}`;

//ask user for postcode
document.querySelector("#searchButton").addEventListener("click", function(event) {
  event.preventDefault();
  let inputPostcode = document.querySelector("#postcodeInput");
  //trim, uppercase and remove spaces from postcode to reduce user error due to the API being case and format sensitive
  let postcode = inputPostcode.value.trim().toUpperCase().replace(/\s/g, "");
  //get address data from api
  axios
    .get(addressEndpoint(postcode))
    .then(response => {
      //create dropdown menu and add addresses
      let dropdown = document.createElement("select");
      dropdown.classList.add("form-control");
      response.data.addresses.forEach(address => {
        let option = document.createElement("option");
        option.value = address
          .split(",")
          .filter(part => part.trim() !== "")
          .join(",") +
          ", " +
          postcode;
        option.innerText = address;
        dropdown.appendChild(option);
      });
      //remove previous dropdown menu if it exists
      let formGroup = document.querySelector(".form-group");
      let previousDropdown = formGroup.querySelector("select");
      if (previousDropdown) {
        formGroup.removeChild(previousDropdown);
      }
      //replace input with dropdown menu
      formGroup.replaceChild(dropdown, inputPostcode);
      //redirect to results page when option is selected
      dropdown.addEventListener("change", function() {
        let submitButton = document.createElement("button");
        submitButton.innerText = "statistics";
        submitButton.classList.add("btn", "btn-success", "ml-2");
        submitButton.addEventListener("click", function() {
          window.location.href = "results.html";
        });
        //replace search button with submit button
        formGroup.removeChild(document.querySelector("#searchButton"));
        formGroup.appendChild(submitButton);
        //create clear button
        let clearButton = document.createElement("button");
        clearButton.innerText = "Clear";
        clearButton.classList.add("btn", "btn-secondary", "ml-2");
        clearButton.addEventListener("click", function() {
          formGroup.removeChild(dropdown);
          formGroup.appendChild(inputPostcode);
          formGroup.removeChild(submitButton);
          formGroup.appendChild(document.querySelector("#searchButton"));
        });
        //add clear button to form group
        formGroup.appendChild(clearButton);
      });
    })
    //create button handlers for error messages
.catch(error => {
  console.error(error);
  let formGroup = document.querySelector(".form-group");
  formGroup.appendChild(errorMessage);
  let retryButton = document.createElement("button");
  retryButton.innerText = "Try Again";
  retryButton.classList.add("btn", "btn-danger", "ml-2");
  retryButton.addEventListener("click", function() {
    formGroup.removeChild(errorMessage);
    formGroup.removeChild(retryButton);
  });
  formGroup.appendChild(retryButton);
});
});