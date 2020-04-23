[![Build Status](https://tchen25.visualstudio.com/Overwatch%20Video%20Site/_apis/build/status/theodoreschen.ng-overwatch-video-site?branchName=master)](https://tchen25.visualstudio.com/Overwatch%20Video%20Site/_build/latest?definitionId=1&branchName=master) ![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/tchen25/Overwatch%20Video%20Site/3)

# NgOverwatchVideoSite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

The intent of this effort is to provide a web application to organize Overwatch clips that have been loaded onto YouTube, with a front end that provides an interface for adding, removing, editing, and viewing videos.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Enter the `overwatch-video-server` directory and run `python3 main.py`. This is the Python backend server that does the saving and fetching of video metadata information. In the future, the backend server will be removed from this and placed in it's own project.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
