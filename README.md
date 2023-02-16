
# THE ECO-LOOKUP WEB APPLICATION (EPC)  <image src="https://img.shields.io/badge/license-MIT-green/size=100"> #



## Table of contents
* [The Scope of the Project](#project-scope)
* [What is the EPC web application?](#what-it-is)
* [What does it do?](#what-does-it-do)
* [User story/acceptence criteria](#user-story)
* [How does it work?](#how-it-works)
* [How to use](#how-to-use)
* [How does it work?](#how-it-works)
* [Agile Methodologies](#agile-methodology)
    - [UX and UI designs](#ux-ui-dev)
    - [Wireframing](#wireframing)
    - [Project requirements](#project-requirements)
    - [Further Development](#furher-work)
    - [References](#references)
* [License](#license)


## The scope of the project ##

This repo forms the submission materials and deployment of the first of two group projects that count towards the formal grades received from completion of the front-end web development bootcamp. The product has been developed to satisfy the [Requirements](#project-requirements)  at the end of the article

## What is the EPC web application?

This easy to use EPC web app is built on top of the opendatacommunities Domestic Energy Performance certificate API. The application itself is built using javascript for easy integration into a webpage, much like the opendatacommunities one. The application leverages the postcodefinder.io address lookup API which makes it as easy as  typing a UK postcode, choosing your address from the dropdown menu then click for your results. It's at this point you can save or print. 

**Note:** In no way is this tool affiliated with opendatacommunities
## What does the EPC Web Application do exactly? ##

The application is designed to be a responsive, simple user interface that allows anybody to look up their Energy Performance Certificate data (EPC) using their postcode to itially search for their full address.

The application does this in several stages. First we will outline the user story and then we can demonstrate that the acceptence criteria have been met and exceeded.

### User story/Acceptaance criteria

> As a user I want to be able to look up energy performance data on my home 

> As a user I want to be able to find my full address quickly using only my postcode 

> As a user I want to be shown a drop down list of all addresses corresponding to the postcode I type in to the find address box

> As a user, when I select my address from the drop-down list my address goes into the search box

> As a user when I click on the search button the results relating to my home are shown in the browser

> As a user I want the results to be displayed concisely and with consistent formatting

<div style="page-break-after: always"></div> 

The application was made around these criteria The authors wish to outline this as the basis for planning the project as the planning stages involved both the planning of the application logic as well as prototyping the user interface using wireframes. We have included the wireframes in the Appendix.

## How does the application work?

The application uses the standard combination of HTML and CSS to render the search page in the browser. The initial search box asks the user for their postcode in order to allow them to search for their address. It does this by making a call to the getaddress.io address finder endpoint.

Whatever the user types into this input field (id="postcodeInput) is captured by the javascript which uses an event listener on the search button (id=searchButton) so that when the user clicks search, their input is taken by the script, spaces are removed, then a request is sent to the API using axios. This is done like so:

```
document.querySelector("#searchButton").addEventListener("click", function (event) {
  event.preventDefault();
  let inputPostcode = document.querySelector("#postcodeInput");
  let postcode = inputPostcode.value.trim().toUpperCase().replace(/\s/g, "");
```

The script then waits for a response which the API returns as an array of addresses. The script will use a forEach loop on the list of addresses and adds them as options to a dropdown list.

```
let dropdown = document.createElement("select");
  dropdown.classList.add("form-control");
  response.data.addresses.forEach(address => {
  let option = document.createElement("option");
  let addressParts = address.split(",").filter(part => part.trim() !== "");
  let formattedAddress = addressParts.join(", ") + ", " + postcode;
  option.value = formattedAddress;
  option.innerText = formattedAddress;
  dropdown.appendChild(option);
  });
```

It is at this point the user is expected to be choosing their address from this newly rendered list. Once the user clicks the option, the box that was user to enter the postcode will change to hold their address and the search button is replaced with a new submit button that is used to query te EPC API in the next step.

```
formGroup.replaceChild(dropdown, inputPostcode);
dropdown.addEventListener("change", function () {
  let submitButton = document.createElement("button");
  submitButton.innerText = "Statistics";
  console.log("created by sean fox")
  submitButton.classList.add("btn", "btn-success", "ml-2");
  submitButton.addEventListener("click", function () {
    window.location.href = "results.html";
  });
```
The postcode and address are stored as variables at this point they can be passed to the other function that will retrieve the final results from the EPC API as seen below.

```
$.ajax({
    type: "GET",
    url: endpoint,
    headers: {
        Accept: "application/json",
        Authorization: "Basic " + encodedApiKey
    },
    success: function (data) {
        let firstResult = data.rows[0];

```
SSince this API can return multiple results (There are usually more than one EPC result for each address since they store the old certificates even when a new one is uploaded) However, by default, the API returns the results in decending order of date meaning the most recenrt result for a given address and postcode will be the most recent and most relevent result. This is why we only need the array in the first 'rows' object
<div style="page-break-after: always"></div> 


## Project Requirements and other references ##


<div style="page-break-after: always"></div> 


### Grading - Technical Acceptance Criteria: 25% ###
- Satisfies the following code requirements:
- Application uses at least two [server-side APIs](https://coding-boot-camp.github.io/full-stack/apis/api-resources)
- Application uses client-side storage to store persistent data.
- Application doesn't use JS alerts, prompts, or confirms (uses modals instead).
- Application uses Bootstrap.
- Application is interactive (accepts and responds to user input)

#### Concept 10% ####
- Application should be a unique and novel idea.
- Your group should clearly and concisely articulate your project idea.

#### Deployment: 20%
- Application deployed at live URL and loads with no errors.
- Application GitHub URL submitted.

#### Repository Quality: 10%
- Repository has a unique name.
- Repository follows best practices for file structure and naming conventions.
- Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.
- Repository contains multiple descriptive commit messages.
- Repository contains a quality README file with description, screenshot, and link to deployed application.

#### Application Quality: 15%
- Application user experience is intuitive and easy to navigate.
- Application user interface style is clean and polished.
- Application is responsive.

#### Presentation 10%
- Your group should present using Powerpoint or a similar presentation software.
- Every group member should speak during the presentation.
- Your presentation should follow the [Project Presentation Template](https://docs.google.com/presentation/d/10QaO9KH8HtUXj__81ve0SZcpO5DbMbqqQr4iPpbwKks/edit?usp=sharing).

#### Collaboration 10%
- There are no major disparities in the number of GitHub contributions between group members.

### How to Submit Your Interactive Front-End Project
- **Each member of your group** is required to submit the following for review:
- TIhe URL of the deployed application.
- The URL of the GitHub repository, with a unique name and a README describing the project.

### Presentation Requirements

- Elevator pitch: a one minute description of your application
- Concept: What is your user story? What was your motivation for development?
- Process: What were the technologies used? How were tasks and roles broken down and assigned? What challenges did you encounter? What were your successes?
- Demo: Show your stuff!
- Directions for Future Development
- Links to the deployed application and the GitHub repository

<br>

 - - - - -


## Licence

Unless stated otherwise, the codebase is released under [the MIT License][mit].
This covers both the codebase and any sample code in the documentation.



 - - - - - - -

## How to use ##

### 1. User inputs their postcode into a form and clicks the search button
![website hompage](./assets/images/wireframe/concept3/singlePages/p1HomPage.png)


### 2. All corresponding addresses appear as a drop-down box
![drop-down menu page](./assets/images/wireframe/concept3/singlePages/p2AfterPostcode.png)

### 2.5 If you search an invalid address you can click on the red button to search for another one
![invalid address page](./assets/images/wireframe/concept3/singlePages/p4InvalidAddress.png)

### 3. User selects their address from the list and clicks "Statistics"
![options page with "Statistics", "Address results" and "Clear" button](./assets/images/wireframe/concept3/singlePages/p3AfterAddress.png)

### 4. The formated address is sent to the EPC API and returns the most up to date information about their property, click on the "Show more" button to see all the informations
![page with property informations in a table](./assets/images/wireframe/concept3/singlePages/p5EPCResults.png)

![page with all the property information in a fullsize table](./assets/images/wireframe/concept3/singlePages/p6EPCResultsShowMore.png)

## Resources:
[Bootstrap](https://www.npmjs.com/package/bootstrap) | [GetAddress API documentation](https://documentation.getaddress.io) | [Domestic EPC search API documentation](https://epc.opendatacommunities.org/docs/api/domestic)

## Wireframes

### First Concept:

![three first concept pages in a row: the hompage, the page with property informations in a table and the page with all the property information in a fullsize table](./assets/images/wireframe/concept1/concept1AllPages.png)

### Second Concept:

![three second concept pages in a row: the hompage, the page for invalid address and the options page with "Statistics", "Address results" and "Clear" button](./assets/images/wireframe/concept2/concept2AllPages.png)

### Third Concept:

![two third concept pages in a row: the hompage and the addresses page](./assets/images/wireframe/concept3/concept3PostcodePages.png)

![two third concept pages in a row: the options page with "Statistics", "Address results" and "Clear" button and the page for invalid address](./assets/images/wireframe/concept3/concept3OptionPages.png)

![two third concept pages in a row: the page with property informations in a table and the page with all the property information in a fullsize table](./assets/images/wireframe/concept3/concept3EPCResultsPages.png)




