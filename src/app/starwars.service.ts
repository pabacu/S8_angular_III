import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Ship } from './model/ship';
import { catchError } from 'rxjs/operators';
import { Pilot } from './model/pilot';


@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

  public baseUrl = "https://swapi.py4e.com/api/"; //"https://swapi.dev/api/";
  public ships = "starships/";
  public pilot = "people/"
  public shipId = ""
  public pilotId = "";
  response: string = "";
  private extraPilots: Pilot[];


  constructor(private httpClient: HttpClient) { }

  public getShips(url: string): Observable<any> {
    if (url == "")
      url = this.baseUrl + this.ships;

    return this.httpClient.get(url)
      .pipe(
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(errorMsg);
        })
      );
  }

  public getShip(_shipId: string): Observable<Ship> {
    this.shipId = _shipId + "/";
    return this.httpClient.get<Ship>(this.baseUrl + this.ships + this.shipId)
  }

  public getPilot(_PilotId: string): Observable<Pilot> {
    this.pilotId = _PilotId + "/";
    return this.httpClient.get<Pilot>(this.baseUrl + this.pilot + this.pilotId)
  }


  public getImageUrlExists(url: string): string {
    this.httpClient.get(url).subscribe(
      response => this.response = url,
      error => this.response = "../../../assets/big-placeholder.jpg");
    return this.response;
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }


  satinize_url(url_id: String) {
    let param = url_id.split('/');
    return param[param.length - 2];
  }
}
