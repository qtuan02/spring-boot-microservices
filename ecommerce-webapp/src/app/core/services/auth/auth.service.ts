import { Injectable, inject, signal } from '@angular/core';
import Keycloak from 'keycloak-js';
import { ENVIRONMENT } from '~/core/tokens/environment.token';
import { UserProfile } from '~/shared/types/user-profile';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private env = inject(ENVIRONMENT);
  private keycloak!: Keycloak;

  isLoggedIn = signal(false);
  username = signal('');
  userProfile = signal<UserProfile | null>(null);

  async init(): Promise<void> {
    this.keycloak = new Keycloak({
      url: this.env.keycloakUrl,
      realm: this.env.keycloakRealm,
      clientId: this.env.keycloakClientId,
    });

    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    });

    this.isLoggedIn.set(authenticated);
    if (authenticated && this.keycloak.tokenParsed) {
      this.username.set(this.keycloak.tokenParsed['preferred_username'] ?? '');
      this.userProfile.set({
        id: this.keycloak.tokenParsed['sub'] ?? '',
        username: this.keycloak.tokenParsed['preferred_username'] ?? '',
        email: this.keycloak.tokenParsed['email'] ?? '',
        firstName: this.keycloak.tokenParsed['given_name'] ?? '',
        lastName: this.keycloak.tokenParsed['family_name'] ?? '',
      });
    }
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }
}
