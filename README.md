# Swapi

  
## Project Setup

To run this project in Linux machine, you will need Node.js LTS along with npm and Angular.

Normally, npm will be installed with Node.js , but it's recommended to get the last version.

  

### Node.js LTS Installation

The installation of node.js differ from distribution to an other, I will cover in this document the installation of Node.js on Ubuntu you can find who to install Node.js in your distribution by simple google search.

  

Copy and paste theses commands in your terminal :

    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    
    sudo apt-get install -y nodejs

  - The first line use curl to execute a script that install a Node.js 12.x repo onto a Debian or Ubuntu system.
  - The second line install Node.js on the current machine.
  
### Update NPM
After Installing Node.js your machine will have access to npm command, use the command below to update to latest version.

    sudo npm install npm@latest -g
    
### Install the Angular CLI
Install angular from npm repository, the -g flag is used to install angular **globally** in your machine.

    sudo npm install -g @angular/cli  

## Development server  

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Features

 **Optimized search bar :** The search bar is enhanced to send a request only when user stopped typing for 0.2 seconds which help reduce the number of requests by a lot, but still give a good user experience.
The request are sent only when a new data is typed (if the user stop typing and the input text has the same value as previous request the request is not sent to the API )  

**Http Pagination :** SWAPI support pagination via http which this project support.

**Reuse old state :** The detail pages reuse the request from list resources, if user navigated from it.

## Used Frameworks

- Angular 10

  

- Angular Material UI
