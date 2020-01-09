import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { CarnetService } from '../carnet.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    constructor(public carnet: CarnetService,
  private router: Router) {

  }

  ngOnInit() {
  }

  ajoutPersonne() {
    this.router.navigate(['/list', 'add']);
  }

  editPersonne(id: string) {
    this.router.navigate(['/list', 'view', id]);
  }

  removePersonne(id: string) {
    this.carnet.removeFromServer(id);
  }
}
