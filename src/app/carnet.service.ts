import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personne } from './personne';
import { Observable } from 'rxjs';

@Injectable()
export class CarnetService {
  carnet: Personne[] = [];

  constructor(private httpClient: HttpClient) {
    this.getListFromServer();
  }

  getListFromServer() {
    this.httpClient.get<Personne[]>('https://torguet.net/MIAGE/MIAGE_CLIENT')
      .subscribe((response) => {
        this.carnet = response;
      }, (error) => {
        console.log('Erreur chargement');
        console.log(error);
      });
  }

  addToServer(p: Personne) {
    this.httpClient.post('https://torguet.net/MIAGE/MIAGE_CLIENT', p)
      .subscribe((response) => {
        console.log('Sauve ');
        this.getListFromServer();
      }, (error) => {
        console.log('Erreur ajout');
        console.log(error);
      });
  }

  removeFromServer(id: number) {
    this.httpClient.delete('https://torguet.net/MIAGE/MIAGE_CLIENT/' + id)
      .subscribe((response) => {
        console.log('Efface ');
        this.getListFromServer();
      }, (error) => {
        console.log('Erreur effacement');
        console.log(error);
      });
  }

  updateOnServer(id: number, p: Personne) {
    this.httpClient.put('https://torguet.net/MIAGE/MIAGE_CLIENT/' + id, p)
      .subscribe((response) => {
        console.log('Sauve ');
        this.getListFromServer();
      }, (error) => {
        console.log('Erreur mise à jour');
        console.log(error);
      });
  }

  getSinglePerson(id: number): Observable<any> {
    return this.httpClient.get('https://torguet.net/MIAGE/MIAGE_CLIENT/' + id);
  }

}