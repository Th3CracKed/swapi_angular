import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Starships, SWAPIResponse } from '../models';
import { APP_ENV } from '../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {

  private apiEndpoint: string;

  constructor(@Inject(APP_ENV) private env: any, private httpClient: HttpClient) {
    this.apiEndpoint = env.apiEndpoint;
  }

  /**
   * Get All starships from SWAPI endpoint
   * @throws Error if apiEndPoint is not defined
   */
  getAllStarships(page?: number): Observable<SWAPIResponse<Starships>> {
    if (!this.apiEndpoint) {
      return throwError(`apiEndPoint is not defined = ${this.apiEndpoint}`);
    }
    const pagination = page ? `?page=${page}` : '';
    return this.httpClient.get<SWAPIResponse<Starships>>(`${this.apiEndpoint}/starships/${pagination}`);
  }

  /**
   * Get a specific starships by url id
   * @throws Error if apiEndPoint is not defined or @param starshipsId is not defined
   */
  getStarships(starshipsId: string): Observable<Starships> {
    if (!this.apiEndpoint || !starshipsId) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} starshipsId = ${starshipsId}`);
    }
    return this.httpClient.get<Starships>(`${this.apiEndpoint}/starships/${starshipsId}`);
  }

  search(searchedValue: string): Observable<SWAPIResponse<Starships>> {
    if (!this.apiEndpoint || !searchedValue) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} searchedValue = ${searchedValue}`);
    }
    return this.httpClient.get<SWAPIResponse<Starships>>(`${this.apiEndpoint}/starships/?search=${searchedValue}`);
  }

}
