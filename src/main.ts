import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom as angularImportProvidersFrom } from '@angular/core';

function importProvidersFrom(module: typeof HttpClientModule): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  return angularImportProvidersFrom(module);
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule)]
});
