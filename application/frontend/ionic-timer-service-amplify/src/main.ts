import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Amplify} from '@aws-amplify/core';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

if (environment.production) {
  enableProdMode();
  Amplify.Logger.LOG_LEVEL = 'INFO';
} else {
  Amplify.Logger.LOG_LEVEL = 'DEBUG';
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
