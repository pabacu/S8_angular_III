import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './componentes/start/start.component';
import { ShipsComponent } from './componentes/ships/ships.component';
import { ShipDetailComponent } from './componentes/ship-detail/ship-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModalSignComponent } from './componentes/modal-sign/modal-sign.component';
import { ModalLoginComponent } from './componentes/modal-login/modal-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PilotDetailComponent } from './componentes/pilot-detail/pilot-detail.component';



const appRoutes:Routes=[
  {path:'', component: StartComponent,data: { animation: 'HomePage' } },
  {path:'ships', component: ShipsComponent,data: { animation: 'ShipPage' } },
  {path:'shipDetail/:id', component: ShipDetailComponent, data: { animation: 'DetailPage' } },
  {path:'pilotDetail/:id', component: PilotDetailComponent, data: { animation: 'PilotDetailPage' } },
  {path:'login', component: ModalLoginComponent, data: { animation: 'Popup' } },
  {path:'signin', component: ModalSignComponent, data: { animation: 'Popup' } },
  
  ];
  
@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ShipsComponent,
    ShipDetailComponent,
    ModalSignComponent,
    ModalLoginComponent,
    PilotDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
