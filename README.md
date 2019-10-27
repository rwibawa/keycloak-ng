# keycloak-ng
Angular application that authenticate to a Keycloak Server with OpenID Connect protocol.

## 1. Setup
```bash
$ ng new keycloak-ng
$ npm i -S keycloak-angular keycloak-js

$ ng generate component components/heroes
$ ng generate service services/heroes/heroes

$ ng generate component components/banner
$ ng generate component components/home

$ ng add @angular/material
Installed packages for tooling via npm.
? Choose a prebuilt theme name, or "custom" for a custom theme: Deep Purple/Amber  [ Preview: https://material.angular.io?theme=deeppurple-amber ]
? Set up HammerJS for gesture recognition? Yes
? Set up browser animations for Angular Material? Yes
UPDATE package.json (1570 bytes)

$ ng generate @angular/material:table components/heroes
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

## 3. Using ngDoBootstrap
The KeycloakService can be initialized before the application loading. When the Keycloak initialization is successful the application is bootstrapped.

This has two major benefits.

  1. This is faster because the application isn't fully bootstrapped and
  2. It prevents a moment when you see the application without having the authorization.

### `AppModule`
```ts
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

const keycloakService = new KeycloakService();

@NgModule({
  imports: [KeycloakAngularModule],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  entryComponents: [AppComponent]
})

export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    keycloakService
      .init()
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');

        appRef.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}
```

### `src/keycloak.json`
Make it available at [http://localhost:4200/keycloak.json](http://localhost:4200/keycloak.json) by adding the static content reference in `angular.json`.
```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  "src/keycloak.json"
]
```

### `src/app/app.authguard.ts`
Refer to it in the `app-routing.module.ts` router configuration:
```ts
import { AppAuthGuard } from 'app/app.authguard';

const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [AppAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})

export class AppRoutingModule { }
```

### Logout method in `src/app/components/banner/banner.component.ts`
```ts
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})

export class BannerComponent implements OnInit {

  constructor(protected keycloakAngular: KeycloakService) { }

  async logout(): Promise<void> {
    try {
      return this.keycloakAngular.logout('http://localhost:4200/home');
    }
    catch (e) {
      return console.error(e);
    }
  }
}
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
