import { InjectionToken } from '@angular/core';

export type Environment = {
  apiBaseUrl: string;
  domain: boolean;
  keycloakUrl: string;
  keycloakRealm: string;
  keycloakClientId: string;
};

export const ENVIRONMENT = new InjectionToken<Environment>('Environment Configuration');
