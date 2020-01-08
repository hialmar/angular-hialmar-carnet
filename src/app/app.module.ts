import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CarnetService } from './carnet.service';
import { AjoutComponent } from './ajout/ajout.component';
import { ListComponent } from './list/list.component';

const appRoutes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'list/add', component: AjoutComponent},
  {path: 'list/view/:id', component: AjoutComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: '**', redirectTo: 'list'}
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, HelloComponent, AjoutComponent, ListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [CarnetService,
    {provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule { }
