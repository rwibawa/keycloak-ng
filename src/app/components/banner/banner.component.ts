import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {

  constructor(protected keycloakAngular: KeycloakService) { }

  ngOnInit() {
  }

  async login(): Promise<void> {
    try {
      return this.keycloakAngular.login();
    }
    catch (e) {
      return console.error(e);
    }
  }

  async logout(): Promise<void> {
    try {
      return this.keycloakAngular.logout('http://localhost:4200/home');
    }
    catch (e) {
      return console.error(e);
    }
  }
}
