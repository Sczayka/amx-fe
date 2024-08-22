import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

// Interceptors
import { httpInterceptorInterceptor } from '@core/interceptors/http-interceptor.interceptor';

// Routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptorInterceptor])),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule, HttpClientModule])
  ]
};
