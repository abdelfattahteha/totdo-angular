# TodoFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Setup 

1- make sure to update apiEndpoint in `encironments` folder in `environment` file change `apiUrl` to your endpoint

```javascript
  export const environment = {
    production: false,
    apiUrl: "http://localhost:3000"
  };
```

2- run npm install

3- ng serve and app will work on `http://localhost/4200`

## Backend Repository
https://github.com/abdelfattahteha/todo-api

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
