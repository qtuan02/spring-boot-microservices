import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { cachingInterceptor } from './core/interceptors/caching.interceptor';
import { ENVIRONMENT } from './core/tokens/environment.token';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ENVIRONMENT, useValue: { apiBaseUrl: 'http://localhost:8989', domain: false } },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([cachingInterceptor])),
    provideHotToastConfig({ style: { marginTop: '70px' }, stacking: 'depth', duration: 1000 }),
  ],
};
