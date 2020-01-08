import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { CarnetService } from './carnet.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(public carnet: CarnetService,
  private router: Router) {

  }


}
