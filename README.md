# KeycloakNg

## 1. Setup
```bash
$ ng new keycloak-ng
$ npm i -S keycloak-angular keycloak-js
$ ng generate component components/heroes
$ ng generate service services/heroes/heroes
```

Get the `keycloak.js` adapter from the Keycloak Server at [http://localhost:8088/auth/js/keycloak.js](http://localhost:8088/auth/js/keycloak.js). Or get the `keycloak.json` by clicking on the `Installation` tab select `Keycloak OIDC JSON` for Format Option then click *Download*. The downloaded `keycloak.json` file should be hosted on your web server at the same location as your HTML pages.
Here is the [Javascript adapter docs](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter).

## 2. import paths
### Base URL
Set the *baseUrl* in `tsconfig.json` to get the relative path for import:
```json
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```

### `index.ts` in the root path of a package:
example: `src/app/services/index.ts`
```js
export * from './heroes/hero';
export * from './heroes/heroes.service';
```

So the import in `heroes.component.ts`:
```js
import { Hero, HeroesService } from 'app/services';
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.13.

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
