




// consider removing everything below this line as it is not needed for the MVP

// function to get the recommendations from the API
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
//              }
//         },
// for recommenations
// ("#recommendation-action").text(recommendationAction);
// $("#recommendation-cost").text(recommendationCost);

// // print each row of the csv to the console skipping first column
//  (let i = 1; i < rowCount-1; i++) {
//     let row = data.split(/\r?\n|\r/)[i].split(",");
//     row.shift();
//     console.log("Recommendation " + i + ": " + data.split(/\r?\n|\r/)[i]);
// }
// now we convert the csv to json
// let csvToJson = Papa.parse(data, {
//     header: true,
//     dynamicTyping: true
// });
// function to write the csv values into table
// writeCsvToTable(data);
// return data;
// function writeCsvToTable(data) {
//                let table = document.getElementById("recommendations-table");
//                let csvData = data.split(/\r?\n|\r/);
//                for (let i = 0; i < csvData.length; i++) {
//                    let row = table.insertRow(-1);
//                    let cells = csvData[i].split(",");
//                    for (let j = 0; j < cells.length; j++) {
//                        let cell = row.insertCell(-1);
//                        cell.innerHTML = cells[j];
//             }
//         }
//     }
//     $(document).ready(function() {
//         $("#recommendations").click(function(event) {
//         // prevent the form from submitting
//         event.preventDefault();
//         const lmkKey = $("#lmk-key").val();
//         getRecommendations(lmkKey);
//     });
// });
