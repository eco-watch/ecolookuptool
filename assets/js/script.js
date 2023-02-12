// function to call the address API when the user submits their postcode


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

            // data array has onject called rows which contains the data we want

            let firstResult = data.rows[0];
            console.log("first result: " + firstResult);

            // rendering the results
            let propertyAddress = firstResult["address"];
            console.log("address: " + propertyAddress);

            let propertyPostcode = firstResult["postcode"];
            console.log("postcode: " + propertyPostcode);

            let currentEnergyEfficiency = firstResult["current-energy-efficiency"];
            console.log("current energy efficiency: " + currentEnergyEfficiency);

            let potentialEnergyEfficiency = firstResult["potential-energy-efficiency"];
            console.log("potential energy efficiency: " + potentialEnergyEfficiency);

            let currentEnergyRating = firstResult["current-energy-rating"];
            console.log("current energy rating: " + currentEnergyRating);

            let potentialEnergyRating = firstResult["potential-energy-rating"];
            console.log("potential energy rating: " + potentialEnergyRating);

            let totalFloorArea = firstResult["total-floor-area"];
            console.log("total floor area: " + totalFloorArea);

            let tenure = firstResult["tenure"];
            console.log("tenure: " + tenure);

            let builtForm = firstResult["built-form"];
            console.log("built form: " + builtForm);

            let propertyType = firstResult["property-type"];
            console.log("property type: " + propertyType);

            let mainsGasFlag = firstResult["mains-gas-flag"];
            console.log("mains gas flag: " + mainsGasFlag);

            let mainFuel = firstResult["main-fuel"];
            console.log("main fuel: " + mainFuel);

            let mainheatDescription = firstResult["mainheat-description"];
            console.log("main heat description: " + mainheatDescription);
            
            let hotwaterDescription = firstResult["hotwater-description"];
            console.log("hot water description: " + hotwaterDescription);

            let wallsDescription = firstResult["walls-description"];
            console.log("walls description: " + wallsDescription);

            let floorDescription = firstResult["floor-description"];
            console.log("floor description: " + floorDescription);

            let roofDescription = firstResult["roof-description"];
            console.log("roof description: " + roofDescription);

            let address = firstResult["address"];
            console.log("address: " + address);

            let postcode = firstResult["postcode"];
            console.log("postcode: " + postcode);

            let lodgementDatetime = firstResult["lodgement-datetime"];
            console.log("lodgement datetime: " + lodgementDatetime);

            let lmkKey = firstResult["lmk-key"];
            console.log("lmk key: " + lmkKey);

            // calls the getCertificate function to retrieve the certificate as well
            getRecommendations(lmkKey);

            // display the results
            $("#address").text(propertyAddress);
            $("#postcode").text(propertyPostcode);
            $("#current-energy-efficiency").text(currentEnergyEfficiency);
            $("#potential-energy-efficiency").text(potentialEnergyEfficiency);
            $("#current-energy-rating").text(currentEnergyRating);
            $("#potential-energy-rating").text(potentialEnergyRating);
            $("#total-floor-area").text(totalFloorArea);
            $("#tenure").text(tenure);
            $("#built-form").text(builtForm);
            $("#property-type").text(propertyType);
            $("#mains-gas-flag").text(mainsGasFlag);
            $("#main-fuel").text(mainFuel);
            $("#mainheat-description").text(mainheatDescription);
            $("#hotwater-description").text(hotwaterDescription);
            $("#walls-description").text(wallsDescription);
            $("#floor-description").text(floorDescription);
            $("#roof-description").text(roofDescription);
            $("#address").text(address);
            $("#postcode").text(postcode);
            $("#lodgement-datetime").text(lodgementDatetime);
            $("#lmk-key").text(lmkKey);




        },
        error: function(error) {
            console.error("Error parsing JSON: ", error);
    }
});
}

// $(document).ready(function() {
//     $("#test").click(function(event) {

//         // prevent the form from submitting
//         event.preventDefault();
        
//         const address = $("#address").val();
//         const postcode = $("#postcode").val();
        
//         console.log(`Address: ${address} Postcode: ${postcode}`);
//         callEpcApi(address, postcode);
//     });
// });

co

// function getRecommendations(lmkKey) {

//     const encodedApiKey = "ZnJvbnRlbmRkZXZAc3RheWhvbWUubGk6M2U3MGM4YjYzMDhkZTQ0OWM3YmY4YzZhMTI4N2FiYTVjYzViNGE0MQ==";
//     const recommendationsEndpoint = `https://epc.opendatacommunities.org/api/v1/domestic/recommendations/${lmkKey}`;
    
//     $.ajax({
//         type: "GET",
//         url: recommendationsEndpoint,
//         headers: {
//             Accept: "text/csv",
//             Authorization: "Basic " + encodedApiKey
//         },
//         success: function(data) {
//             // console.log("Response is in CSV format");
//             // console.log("Recommendations: " + data);

//             for (let i = 1; i < rowCount-1; i++) {
//                 let row = data.split(/\r?\n|\r/)[i].split(",");
//                 row.shift();
//                 // item 2 is the recommendation action
//                 recommendationAction = row[i];column[3];
//                 recommendationCost = row[i];column[4];

//                 const recommendationAction = $("#recommendation-action").val();;
//                 const recommendationCost = $("#recommendation-cost").val();

//             }


            

            
            // // for recommenations
            // $("#recommendation-action").text(recommendationAction);
            // $("#recommendation-cost").text(recommendationCost);


            // print each row of the csv to the console skipping first column

            for (let i = 1; i < rowCount-1; i++) {
                let row = data.split(/\r?\n|\r/)[i].split(",");
                row.shift();
                console.log("Recommendation " + i + ": " + data.split(/\r?\n|\r/)[i]);
            }







            // now we convert the csv to json
            // let csvToJson = Papa.parse(data, {
            //     header: true,
            //     dynamicTyping: true
            // });


            // function to write the csv values into table
            // writeCsvToTable(data);
            // return data;


        },
        error: function(error) {
            console.error("Error parsing JSON: ", error);
    }
});
}

// function writeCsvToTable(data) {
    
//         let table = document.getElementById("recommendations-table");
//         let csvData = data.split(/\r?\n|\r/);
//         for (let i = 0; i < csvData.length; i++) {
//             let row = table.insertRow(-1);
//             let cells = csvData[i].split(",");
//             for (let j = 0; j < cells.length; j++) {
//                 let cell = row.insertCell(-1);
//                 cell.innerHTML = cells[j];
//             }
//         }
//     }

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

// $(document).ready(function() {
//     $("#recommendations").click(function(event) {

//         // prevent the form from submitting
//         event.preventDefault();
        
// const lmkKey = $("#lmk-key").val();

//         getRecommendations(lmkKey);
//     });
// });


