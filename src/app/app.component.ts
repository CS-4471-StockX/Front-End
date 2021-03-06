import { Component } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StockX';
}

(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
