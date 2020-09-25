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

## Used Frameworks

- Angular 10

  

- Angular Material UI
