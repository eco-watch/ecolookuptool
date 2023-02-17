
// function to call the EPC API when the user submits their address
function callEpcApi(address, postcode) {
    // const encodedApiKey = "ZGlnaWZldGNoY29uc3VsdGFudHNAZ21haWwuY29tOjA2ZjQ5ZThiOTczODhhODc5MjVjNjE5MTc3MzI3NmNmYmZlNTI3Yjk="; // new api key
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
      dataType: "text", // set the data type to "text"
      success: function(response) {
        console.log("Response is in text format: " + response);
        console.log(response);
    
        console.log("Parsing response as JSON");
        let data = JSON.parse(response); // manually parse the response as JSON
        // data array has object called rows which contains the data we want
        let firstResult = data.rows[0];

        console.log("first result: " + firstResult);

        let epcData = {};

        const properties = ['address', 'postcode', 'current-energy-efficiency', 'potential-energy-efficiency', 
        'current-energy-rating', 'potential-energy-rating', 'total-floor-area', 'tenure', 'built-form', 'property-type', 
        'mains-gas-flag', 'main-fuel', 'mainheat-description', 'hotwater-description', 'walls-description', 
        'floor-description', 'roof-description', 'lodgement-datetime', 'lmk-key', 'validatedAddress'];

        for (let property of properties) {
          epcData[property] = firstResult[property];
        }

        localStorage.setItem("epcData", JSON.stringify(epcData));
        console.log("EPC data saved to local storage");

        const displayProperties = ['address', 'postcode', 'current-energy-efficiency', 'potential-energy-efficiency', 
        'current-energy-rating', 'potential-energy-rating', 'total-floor-area', 'tenure', 'built-form', 'property-type', 
        'mains-gas-flag', 'main-fuel', 'mainheat-description', 'hotwater-description', 'walls-description', 
        'floor-description', 'roof-description', 'lodgement-datetime', 'lmk-key'];
        
        for (let property of displayProperties) {
          $(`#${property}`).text(firstResult[property]);
        }

        let currentEnergyRating = displayProperties["current-energy-rating"];
        let potentialEnergyRating = displayProperties["potential-energy-rating"];

      // check the current and potential ratings and format the relevant card with a class from the css sheet
      switch (currentEnergyRating) {
      case "A":
        $("#current-energy-rating").addClass("rating_a");
        break;
      case "B":
        $("#current-energy-rating").addClass("rating_b");
        break;
      case "C":
        $("#current-energy-rating").addClass("rating_c");
        break;
      case "D":
        $("#current-energy-rating").addClass("rating_d");
        break;
      case "E":
        $("#current-energy-rating").addClass("rating_e");
        break;
      case "F":
        $("#current-energy-rating").addClass("rating_f");
        break;
      case "G":
        $("#current-energy-rating").addClass("rating_g");
        break;
      default:
        // if the rating is not A-G then it is not rated 
        return;
      }


        if (potentialEnergyRating == "A") {
          $("#potential-energy-rating").addClass("rating_a");
        }
        else if (potentialEnergyRating == "B") {
          $("#potential-energy-rating").addClass("rating_b");
        }
        else if (potentialEnergyRating == "C") {
          $("#potential-energy-rating").addClass("rating_c");
        }
        else if (potentialEnergyRating == "D") {
          $("#potential-energy-rating").addClass("rating_d");
        }
        else if (potentialEnergyRating == "E") {
          $("#potential-energy-rating").addClass("rating_e");
        }
        else if (potentialEnergyRating == "F") {
          $("#potential-energy-rating").addClass("rating_f");
        }
        else if (potentialEnergyRating == "G") {
          $("#potential-energy-rating").addClass("rating_g");
        }

        // write a concatenated hyperlink to the id download-results in the results.html page
        let lmkKey = firstResult["lmk-key"];
        let downloadLink = `https://epc.opendatacommunities.org/domestic/certificate/${lmkKey}`;
        $("#download-results").html(`<a href="${downloadLink}" target="_blank">Download your results (.ZIP)</a>`);


        //   // rendering the results
        // let propertyAddress = firstResult["address"];
        // console.log("address: " + propertyAddress); 
        // let propertyPostcode = firstResult["postcode"];
        // console.log("postcode: " + propertyPostcode);
        // let currentEnergyEfficiency = firstResult["current-energy-efficiency"];
        // console.log("current energy efficiency: " + currentEnergyEfficiency);
        // let potentialEnergyEfficiency = firstResult["potential-energy-efficiency"];
        // console.log("potential energy efficiency: " + potentialEnergyEfficiency);
        // let currentEnergyRating = firstResult["current-energy-rating"];
        // console.log("current energy rating: " + currentEnergyRating);
        // let potentialEnergyRating = firstResult["potential-energy-rating"];
        // console.log("potential energy rating: " + potentialEnergyRating);
        // let totalFloorArea = firstResult["total-floor-area"];
        // console.log("total floor area: " + totalFloorArea);
        // let tenure = firstResult["tenure"];
        // console.log("tenure: " + tenure);
        // let builtForm = firstResult["built-form"];
        // console.log("built form: " + builtForm);
        // let propertyType = firstResult["property-type"];
        // console.log("property type: " + propertyType);
        // let mainsGasFlag = firstResult["mains-gas-flag"];
        // console.log("mains gas flag: " + mainsGasFlag);
        // let mainFuel = firstResult["main-fuel"];
        // console.log("main fuel: " + mainFuel);
        // let mainheatDescription = firstResult["mainheat-description"];
        // console.log("main heat description: " + mainheatDescription);
        // let hotwaterDescription = firstResult["hotwater-description"];
        // console.log("hot water description: " + hotwaterDescription);
        // let wallsDescription = firstResult["walls-description"];
        // console.log("walls description: " + wallsDescription);
        // let floorDescription = firstResult["floor-description"];
        // console.log("floor description: " + floorDescription);
        // let roofDescription = firstResult["roof-description"];
        // console.log("roof description: " + roofDescription);
        // let address = firstResult["address"];
        // console.log("address: " + address);
        // let postcode = firstResult["postcode"];
        // console.log("postcode: " + postcode);
        // let lmkKey = firstResult["lmk-key"];
        // console.log("lmk key: " + lmkKey);
        // let lodgementDatetime = firstResult["lodgement-datetime"];
        // console.log("lodgement datetime: " + lodgementDatetime);
        
        // // display the results wherever thes IDs are
        // $("#address").text(propertyAddress);
        // $("#postcode").text(propertyPostcode);
        // $("#current-energy-efficiency").text(currentEnergyEfficiency);
        // $("#potential-energy-efficiency").text(potentialEnergyEfficiency);
        // $("#current-energy-rating").text(currentEnergyRating);
        // $("#potential-energy-rating").text(potentialEnergyRating);
        // $("#total-floor-area").text(totalFloorArea);
        // $("#tenure").text(tenure);
        // $("#built-form").text(builtForm);
        // $("#property-type").text(propertyType);
        // $("#mains-gas-flag").text(mainsGasFlag);
        // $("#main-fuel").text(mainFuel);
        // $("#mainheat-description").text(mainheatDescription);
        // $("#hotwater-description").text(hotwaterDescription);
        // $("#walls-description").text(wallsDescription);
        // $("#floor-description").text(floorDescription);
        // $("#roof-description").text(roofDescription);
        // $("#lodgement-datetime").text(lodgementDatetime);
        // $("#lmk-key").text(lmkKey);

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error getting EPC data: " + textStatus);
        console.log("Error details: " + errorThrown);
        console.log("Response text: " + jqXHR.responseText);      
      }
    });
  }

  // if the pager loads with the url appended with the address and postcode, then get the address and postcode from the url and display it
  $(document).ready(function() {
    // document.prevebnDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get("address");
    const postcode = urlParams.get("postcode");

    // url encode the address
    // const encodedAddress = encodeURIComponent(address);

    if (address && postcode) {
      $("#address").val(address);
      $("#postcode").val(postcode);
    }
    console.log(`Address: ${address} Postcode: ${postcode}`);

    callEpcApi(address, postcode);
  });

  // let epcData = {
  //   propertyAddress,
  //   propertyPostcode,
  //   currentEnergyEfficiency,
  //   potentialEnergyEfficiency,
  //   currentEnergyRating,
  //   potentialEnergyRating,
  //   totalFloorArea,
  //   tenure,
  //   builtForm,
  //   propertyType,
  //   mainsGasFlag,
  //   mainFuel,
  //   mainheatDescription,
  //   hotwaterDescription,
  //   wallsDescription,
  //   floorDescription,
  //   roofDescription,
  //   lodgementDatetime,
  //   lmkKey,
  //   validatedAddress
  // };
  
  // localStorage.setItem("epcData", JSON.stringify(epcData));
  // console.log("EPC data saved to local storage");

  
        // let epcData = {};

        // const properties = ['address', 'postcode', 'current-energy-efficiency', 'potential-energy-efficiency', 
        // 'current-energy-rating', 'potential-energy-rating', 'total-floor-area', 'tenure', 'built-form', 'property-type', 
        // 'mains-gas-flag', 'main-fuel', 'mainheat-description', 'hotwater-description', 'walls-description', 
        // 'floor-description', 'roof-description', 'lodgement-datetime', 'lmk-key', 'validatedAddress'];

        // for (let property of properties) {
        //   epcData[property] = firstResult[property];
        // }

        // localStorage.setItem("epcData", JSON.stringify(epcData));
        // console.log("EPC data saved to local storage");

        // const displayProperties = ['address', 'postcode', 'current-energy-efficiency', 'potential-energy-efficiency', 
        // 'current-energy-rating', 'potential-energy-rating', 'total-floor-area', 'tenure', 'built-form', 'property-type', 
        // 'mains-gas-flag', 'main-fuel', 'mainheat-description', 'hotwater-description', 'walls-description', 
        // 'floor-description', 'roof-description', 'lodgement-datetime', 'lmk-key'];
        
        // for (let property of displayProperties) {
        //   $(`#${property}`).text(firstResult[property]);
        // }






        
  
  // // $(document).ready(function() {
  //   $("#test").click(function(event) {
  //     // prevent the form from submitting
  //     event.preventDefault();

  //     let address = JSON.parse(localStorage.getItem("truncatedAddress"));
  //     let postcode = JSON.parse(localStorage.getItem("postcode"));
  
  //     // const address = $("#address").val();
  //     // const postcode = $("#postcode").val();
  //     // const validatedAddress = JSON.parse(localStorage.getItem("validatedAddress"));

  
  //     console.log(`Address: ${address} Postcode: ${postcode}`);
  //     callEpcApi(address, postcode, validatedAddress);
  //   });
  // });


  

  // // on page load, get the validated address from local storage and display it
  // $(document).ready(function() {

  //   event.preventDefault();

  //   const truncatedAddress = JSON.parse(localStorage.getItem("truncatedAddress"));
  //   const importedPostcode = JSON.parse(localStorage.getItem("postcode"));

  //   $("#address").val(truncatedAddress);
  //   $("#postcode").val(importedPostcode);

  //   console.log(`Address: ${truncatedAddress} Postcode: ${importedPostcode}`);


  //   callEpcApi(truncatedAddress, importedPostcode);
  
    
  // });