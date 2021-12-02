import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import PubSub, { AWSIoTProvider } from '@aws-amplify/pubsub';


Amplify.configure(awsconfig);

// >>New - Configuring Auth Module
Auth.configure(awsconfig);

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'us-east-2',
  aws_pubsub_endpoint: 'wss://ayfcr0t3x1f4a-ats.iot.us-east-2.amazonaws.com/mqtt',
}));


Auth.currentCredentials().then((info) => {
  console.log(info.identityId);
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
