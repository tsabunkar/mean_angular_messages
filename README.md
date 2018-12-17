# AngularPwa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

============================================================================================

Steps to create this angular-pwa in new angular project -

tejassabunkar@TEJAS-LEGION MINGW64 /d/work_space/VSC/angular_pwa_kickstart
$ ng new angular-pwa

tejassabunkar@TEJAS-LEGION MINGW64 /d/work_space/VSC/angular_pwa_kickstart
$ cd angular-pwa/

tejassabunkar@TEJAS-LEGION MINGW64 /d/work_space/VSC/angular_pwa_kickstart/angular-pwa (master)
$ ng add @angular/pwa

tejassabunkar@TEJAS-LEGION MINGW64 /d/work_space/VSC/angular_pwa_kickstart/angular-pwa (master)
$ ng build --prod

tejassabunkar@TEJAS-LEGION MINGW64 /d/work_space/VSC/angular_pwa_kickstart/angular-pwa (master)
$ cd dist/

tejassabunkar@TEJAS-LEGION MINGW64 /d/work_space/VSC/angular_pwa_kickstart/angular-pwa/dist (master)
$ cd angular-pwa/

tejassabunkar@TEJAS-LEGION MINGW64 /d/work_space/VSC/angular_pwa_kickstart/angular-pwa/dist/angular-pwa (master)
$ http-server -p 9002

------------------------------------------------------------
How to add angular material ?
 
Old technqiue-
npm install --save @angular/material @angular/cdk @angular/animations

New Technique-
ng add @angular/material