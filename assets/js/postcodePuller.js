// let apiKey = "1AzPegcMMkOQVoBwvo0EFQ37970"; // rotate these every 20 uses
let apiKey = "_xy_IpegBUyjs-5pq0GoAA38077"; // added new key for zoom demo
let addressEndpoint = (postcode) => `https://api.getAddress.io/find/${postcode}?api-key=${apiKey}`;

// Ask user for postcode
document.querySelector("#searchButton").addEventListener("click", function (event) {
    // Define selectedAddress at the top of the function
    let selectedAddress;

    event.preventDefault();
    let inputPostcode = document.querySelector("#postcodeInput");
    let postcode = inputPostcode.value.trim().toUpperCase().replace(/\s/g, "");
    // add postode to local storage
    localStorage.setItem("postcode", postcode);
    axios
    .get(addressEndpoint(postcode))
    .then((response) => {
        let dropdown = document.createElement("select");
        dropdown.classList.add("form-control");
        response.data.addresses.forEach((address) => {
            let option = document.createElement("option");
            let addressParts = address.split(",").filter((part) => part.trim() !== "");
            let formattedAddress = addressParts.join(", ") + ", " + postcode;
            option.value = formattedAddress;
            option.innerText = formattedAddress;
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
            submitButton = document.createElement("button");
            submitButton.innerText = "Statistics";
            submitButton.classList.add("btn", "btn-success", "ml-2");

            // add event listemner to submit button
            submitButton.addEventListener("click", function () {
                selectedAddress = dropdown.value;
                localStorage.setItem("validatedAddress", selectedAddress);
                // truncate after the second comma
                const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(","));
                localStorage.setItem("truncatedAddress", truncatedAddress);
                window.open(`results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`, "_blank");
                // window.location.href = `results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`;
            }); 
            //adjusted localstorage to truncate the stored address
            // submitButton.addEventListener("click", function () {
            //     const selectedAddress = dropdown.value;
            //     localStorage.setItem("validatedAddress", selectedAddress);
            //     // truncate after the second comma
            //     const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(",", selectedAddress.indexOf(",") + 1));
            //     localStorage.setItem("truncatedAddress", truncatedAddress);
            //     window.location.href = `results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`;
            // });

            // Replace search button with submit button
            formGroup.removeChild(document.querySelector("#searchButton"));
            formGroup.appendChild(submitButton);
            // Create clear button
            let clearButton = document.createElement("button");
            clearButton.innerText = "Clear";
            clearButton.classList.add("btn", "btn-secondary", "ml-2");
            clearButton.addEventListener("click", function () {
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
            if (submitButton) {
                submitButton.addEventListener("click", function () {
                    selectedAddress = dropdown.value;
                    localStorage.setItem("validatedAddress", selectedAddress);
                    // truncate after the second comma
                    // truncate after the first comma
                    const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(","));
                     // truncate after the second comma
                    // const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(",", selectedAddress.indexOf(",") + 1));
                    localStorage.setItem("truncatedAddress", truncatedAddress);
                    // open results page in new tab
                    window.open(`results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`, "_blank");
                    // window.location.href = `results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`;
                });
            }
            // Remove previous Address results button if it exists
            let previousAddressResultsButton = formGroup.querySelector("#addressResultsButton");
            if (previousAddressResultsButton) {
                formGroup.removeChild(previousAddressResultsButton);
            }
            formGroup.appendChild(addressResultsButton);
            // Add clear button to form group
            formGroup.appendChild(clearButton);
            // Save results to local storage
            const results = {};
            selectedAddress = dropdown.value;
            results["address"] = selectedAddress;
            localStorage.setItem("results", JSON.stringify(results));
            localStorage.setItem("validatedAddress", selectedAddress);
            const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(","));
            localStorage.setItem("truncatedAddress", truncatedAddress);
        })
    })
    .catch((error) => {
        console.log(error);
        
        let invalidPostcodeButton = document.createElement("button");
        invalidPostcodeButton.innerText = "Invalid Postcode - click to try again";
        invalidPostcodeButton.classList.add("btn", "btn-danger", "ml-2");
        invalidPostcodeButton.addEventListener("click", function () {
            formGroup.removeChild(invalidPostcodeButton);
            formGroup.appendChild(document.querySelector("#searchButton"));
        });
        
        let formGroup = document.querySelector(".form-group");
            formGroup.appendChild(invalidPostcodeButton);
    })

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("address")) {
        let validatedAddress = searchParams.get("address");
        let formGroup = document.querySelector(".form-group");
        let inputPostcode = document.querySelector("#postcodeInput");
        let dropdown = document.createElement("select");
        dropdown.classList.add("form-control");
        let option = document.createElement("option");
        option.value = validatedAddress;
        option.innerText = validatedAddress;
        dropdown.appendChild(option);
        formGroup.replaceChild(dropdown, inputPostcode);

        // Redirect to results page when option is selected
        if (submitButton) {
            submitButton.addEventListener("click", function () {
                selectedAddress = dropdown.value;
                localStorage.setItem("validatedAddress", selectedAddress);
                // truncate after the second comma
                // truncate after the first comma
                const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(","));
                // // truncate after the second comma
                // const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(",", selectedAddress.indexOf(",") + 1));
                localStorage.setItem("truncatedAddress", truncatedAddress);
                window.open(`results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`, "_blank");
                // window.location.href = `results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`;
            });
        }
        // Replace search button with submit button
        formGroup.removeChild(document.querySelector("#searchButton"));


        let submitButton = document.createElement("button");
        submitButton.innerText = "Statistics";
        submitButton.classList.add("btn", "btn-success", "ml-2");

        if (submitButton) {
            submitButton.addEventListener("click", function () {
                selectedAddress = dropdown.value;
                localStorage.setItem("validatedAddress", selectedAddress);
                // truncate after the first comma
                const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(","));
                // // truncate after the second comma
                // const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(",", selectedAddress.indexOf(",") + 1));
                localStorage.setItem("truncatedAddress", truncatedAddress);
                window.open(`results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`, "_blank");
                // window.location.href = `results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`;
            });
        }
        
        formGroup.appendChild(submitButton);
        // Create clear button
        let clearButton = document.createElement("button");
        clearButton.innerText = "Clear";
        clearButton.classList.add("btn", "btn-secondary", "ml-2");
        clearButton.addEventListener("click", function () {
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
        if (submitButton) {
            submitButton.addEventListener("click", function () {
                selectedAddress = dropdown.value;
                localStorage.setItem("validatedAddress", selectedAddress);
                // truncate after the first comma
                const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(","));
                // replace spaces with %20 for URL
                localStorage.setItem("truncatedAddress", truncatedAddress);
                window.open(`results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`, "_blank");
                // window.location.href = `results.html?address=${encodeURIComponent(truncatedAddress)}&postcode=${encodeURIComponent(postcode)}`;
            });
        }
    
        formGroup.appendChild(addressResultsButton);
        // Add clear button to form group
        formGroup.appendChild(clearButton);
        // Save results to local storage
        const results = {};
        results["address"] = validatedAddress;
        localStorage.setItem("results", JSON.stringify(results));
        localStorage.setItem("validatedAddress", validatedAddress);
        const truncatedAddress = selectedAddress.substring(0, selectedAddress.indexOf(","));
        localStorage.setItem("truncatedAddress", truncatedAddress);

    }
});
