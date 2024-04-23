import { Component, OnInit } from '@angular/core';
import { OAuthService, NullValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/*
export class AppComponent {
  title = 'Tour of Heroes';
  constructor(private oauthService: OAuthService) {
    this.configure();
  }
authConfig: AuthConfig = {
    issuer: 'http://localhost:8082/realms/smm-poc-approach',
    redirectUri: window.location.origin + "/heroes",
    clientId: 'smm-spring-poc',
    scope: 'openid profile email offline_access roles',
    responseType: 'id_token',
    // at_hash is not present in JWT token
    disableAtHashCheck: true,
    showDebugInformation: true
  }
  
  public login() {
    this.oauthService.initImplicitFlow();
  }
  
  public logoff() {
    this.oauthService.logOut();
  }  
  
  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new  NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}*/

export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData}) => console.log(userData));
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }
}
