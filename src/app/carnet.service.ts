import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personne } from './personne';
import { Observable } from 'rxjs';

@Injectable()
export class CarnetService {
  carnet: Personne[] = [];

  // Heroku
  //url = 'https://hialmar-miage-carnet.herokuapp.com/MIAGE_CLIENT/';
  // Azure
  //url = 'https://miagecarnet.azurewebsites.net/MIAGE_CLIENT/';
  // Gcloud
  url = 'https://gcloud.torguet.net:3000/MIAGE_CLIENT/';


  constructor(private httpClient: HttpClient) {
    this.getListFromServer();
  }

  addUsualSuspects() {
    let p = new Personne();
    p.idclient = '0';
    p.nom = 'Dupond';
    p.prenom = 'Jean';
    p.adresse = 'Ici';
    p.codepostal = 123;
    p.ville = 'Toulouse';
    this.addToServer(p);
    p.idclient = '1';
    p = new Personne();
    p.nom = 'Durand';
    p.prenom = 'Marcel';
    p.adresse = 'La';
    p.ville = 'Toulouse';
    p.codepostal = 345;
    this.addToServer(p);
    p = new Personne();
    p.idclient = '2';
    p.nom = 'Martin';
    p.prenom = 'Joseph';
    p.adresse = 'Labas';
    p.codepostal = 34566;
    p.ville = 'Toulouse';
    this.addToServer(p);
  }

  getListFromServer() {
    this.httpClient.get<Personne[]>(this.url).subscribe(
      (response) => {
        if (response == null || response.length == 0) {
          this.addUsualSuspects();
        }
        this.carnet = response;
      },
      (error) => {
        console.log('Erreur chargement');
        console.log(error);
      }
    );
  }

  addToServer(p: Personne) {
    this.httpClient.post(this.url, p).subscribe(
      (response) => {
        console.log('Sauve ');
        this.getListFromServer();
      },
      (error) => {
        console.log('Erreur ajout');
        console.log(error);
      }
    );
  }

  removeFromServer(id: string) {
    this.httpClient.delete(this.url + id).subscribe(
      (response) => {
        console.log('Efface ');
        this.getListFromServer();
      },
      (error) => {
        console.log('Erreur effacement');
        console.log(error);
      }
    );
  }

  updateOnServer(id: string, p: Personne) {
    this.httpClient.put(this.url + id, p).subscribe(
      (response) => {
        console.log('Sauve ');
        this.getListFromServer();
      },
      (error) => {
        console.log('Erreur mise à jour');
        console.log(error);
      }
    );
  }

  getSinglePerson(id: string): Observable<any> {
    return this.httpClient.get(this.url + id);
  }
}
