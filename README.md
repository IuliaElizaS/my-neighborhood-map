
 ## My Neighborhood Map Project

This is the final project for Udacity Front-End Web Developer Nanodegree Scholarships and has only learning purpose.

In this project, students have to develop a single page application featuring a map of a neighborhood the students choose. Then students have to add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content. The application also has to be mobile responsive.


## Specification

For this project there is no starting code. The students have to build the app from scratch according to the project rubric.

## Important

- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md);

- The application can be run offline using the service worker that is provided via create-react-app. It will work only on production build (production mode);

- The project includes `google-maps-react` library;

-  The app uses GoogleMaps API, GoogleApiWrapper and Foursquare API;


## How to run the application

1. Clone or download the repository
2. Install all project dependencies with `npm install`
3. Start the development server with `npm start`
4. NOTE: the service worker only works in production mode. To build the app for production run `npm run build` before `npm start`

## How to use the application
1. The map is centered on Baia Mare, a medium town from Romania, where I was born and lived for more than 30 years.
2. My project displays some of the places where people can spend quality time.
3. The places can be filtered by category using the filter box in the sidebar.
4. Clicking on a place name from the list or marker on the map will highlight the place on the map and open a small window that shows a few infos about that place.
5. Clicking on the map will close the info window and deselect the place.
6. If you are watching the map on smaller screens you have to click the hamburger button to open, or close the sidebar.


## Sources

- The Map fetched from Google Maps using Google Maps API

- Places and additional information for the places, fetched from https://foursquare.com/ using Foursquare API

- Marker icons: https://png.icons8.com

- MapContainer component adapted from: https://www.npmjs.com/package/google-maps-react

 https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/

and https://developers.google.com/maps/documentation/javascript/examples/hiding-features

- Map accessibility guidelines: http://web-accessibility.carnegiemuseums.org/content/maps/

- Forsquare API implementation: foursquareAPI https://developer.foursquare.com/docs/api/getting-started



## THANKS

Being the last project during this scholarship I would like to thank again to:
- UDACITY and GOOGLE for this opportunity and amazing 9 months journey;
- my MENTORS during this program, STUDENT FELLOWS, PROJECT REVIEWERS and the COMMUNITY MEMBERS for their help, tips and guidance in times of trouble;
- COMMUNITY MANAGERS for their effort and support for such a big community;

------------------------------- THANK YOU ! -----------------------------
