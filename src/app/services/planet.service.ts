import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Planet, SWAPIResponse } from '../models';
import { APP_ENV } from '../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private apiEndpoint: string;

  constructor(@Inject(APP_ENV) private env: any, private httpClient: HttpClient) {
    this.apiEndpoint = env.apiEndpoint;
  }

  /**
   * Get All planets from SWAPI endpoint
   * @throws Error if apiEndPoint is not defined
   */
  getAllPlanets(page?: number): Observable<SWAPIResponse<Planet>> {
    if (!this.apiEndpoint) {
      return throwError(`apiEndPoint is not defined = ${this.apiEndpoint}`);
    }
    const pagination = page ? `?page=${page}` : '';
    return this.httpClient.get<SWAPIResponse<Planet>>(`${this.apiEndpoint}/planets/${pagination}`);
  }

  /**
   * Get a specific planet by url id
   * @throws Error if apiEndPoint is not defined or @param planetId is not defined
   */
  getPlanet(planetId: string): Observable<Planet> {
    if (!this.apiEndpoint || !planetId) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} planetId = ${planetId}`);
    }
    return this.httpClient.get<Planet>(`${this.apiEndpoint}/planets/${planetId}`);
  }

  search(searchedValue: string): Observable<SWAPIResponse<Planet>> {
    if (!this.apiEndpoint || !searchedValue) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} searchedValue = ${searchedValue}`);
    }
    return this.httpClient.get<SWAPIResponse<Planet>>(`${this.apiEndpoint}/planets/?search=${searchedValue}`);
  }

}
