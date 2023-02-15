# ecolookuptool

## Description

A web app that looks up the energy performance of a property given it's address then sends the user to a website for more information

## Table of Contents
- [How it Works](#how-it-works)
- [Resources](#resources)
- [Wireframes](#wireframes)

## How it Works

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

