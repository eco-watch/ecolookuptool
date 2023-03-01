
# THE ECO-LOOKUP WEB APPLICATION (EPC)  <image src="https://img.shields.io/badge/license-MIT-green/size=100"> #

## Live deployment

TBC

## Table of contents
- [THE ECO-LOOKUP WEB APPLICATION (EPC)  ](#the-eco-lookup-web-application-epc--)
  - [Live deployment](#live-deployment)
  - [Table of contents](#table-of-contents)
  - [The scope of the project](#the-scope-of-the-project)
  - [What does the EPC Web Application do exactly?](#what-does-the-epc-web-application-do-exactly)
  - [How does the application work?](#how-does-the-application-work)
  - [How to use](#how-to-use)
  - [References](#references)
  - [Licence](#licence)


## The scope of the project

Further work on top of the ecolookuptool repository. A full bootstrapped website will be produced and the site will use the openai API to display recommendations to the user on steps the user can take to save on  their gas/electricity bills. The site will feature an 'email me my results' button as well  as directing the user to partner sites.
## What does the EPC Web Application do exactly? ##

The application is designed to be a responsive, simple user interface that allows anybody to look up their Energy Performance Certificate data (EPC) using their postcode to search for their full address.
<div style="page-break-after: always"></div> 

## How does the application work?

- User searches for their address using their postcode to find their full address
- Postcode and full address get submitted to the EPC API endpoint and the most recent result is displayed.
- All fields from the EPC response are submitted to a custom trained openai model that returns recommendations for their specific property
- The openai recommendations need to be more accurate than the ones in the certificate response
- The openai recommendations need to be tailored to the users location and account for funding rules in their area
- Recommendations takes into account the tenure of the property

## How to use ##

The enhanced version of this app should be designed as to require the absolute minimum of instructions for the end user, that it, it should be intuitive.

## References

 [GetAddress.io Address finder API documentation](https://documentation.getaddress.io) | [OpenDataCommunities Domestic EPC search API documentation](https://epc.opendatacommunities.org/docs/api/domestic) | [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/) | [jQuery Documention](https://api.jquery.com/) 

## Licence

Unless stated otherwise, the codebase is released under 
 [The MIT license](https://mit-license.org/)
