import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpClientModule } from '@angular/common/http';

import { LoginComponent } from '../app/auth/login/login.component';
import { AuthInterceptor } from '../app/auth/auth.interceptor';
import { AuthGuard } from '../app/guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(HttpClientModule),
    provideRouter([
      { path: 'login', component: LoginComponent },
      {
        path: '',
        //canActivate: [AuthGuard],
        loadChildren: () =>
          import('../app/pages/pages.module').then((m) => m.PagesModule),
      },
      { path: '**', redirectTo: 'login' },
    ]),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
