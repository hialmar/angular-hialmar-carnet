import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { CarnetService } from '../carnet.service';
import { Personne } from '../personne'


@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent implements OnInit {

  edit = false;

  p : Personne ;

  constructor(public carnet: CarnetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.p = new Personne();
    this.edit = false;
    // const id = this.route.snapshot.params.id;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        console.log(id);
        this.edit = true;
        this.carnet.getSinglePerson(id).subscribe((response) => {
            this.p = response;
          }, (error) => {
          console.log('Erreur mise à jour');
          console.log(error);
        });
      }
    });
  }

  onSubmit() {
    if (this.edit) {
      console.log('edit nom ' + this.p.nom);
      this.carnet.updateOnServer(this.p.idclient, this.p);
    } else {
      console.log('add nom ' + this.p.nom);
      this.carnet.addToServer(this.p);
    }
    this.router.navigate(['/list']);
  }

}
