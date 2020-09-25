import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { People, SWAPIResponse } from '../models';
import { APP_ENV } from '../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private apiEndpoint: string;

  constructor(@Inject(APP_ENV) private env: any, private httpClient: HttpClient) {
    this.apiEndpoint = env.apiEndpoint;
  }

  /**
   * Get All characters from SWAPI endpoint
   * @throws Error if apiEndPoint is not defined
   */
  getAllCharacters(page?: number): Observable<SWAPIResponse<People>> {
    if (!this.apiEndpoint) {
      return throwError(`apiEndPoint is not defined = ${this.apiEndpoint}`);
    }
    const pagination = page ? `?page=${page}` : '';
    return this.httpClient.get<SWAPIResponse<People>>(`${this.apiEndpoint}/people/${pagination}`);
  }

  /**
   * Get a specific character by url id
   * @throws Error if apiEndPoint is not defined or @param peopleId is not defined
   */
  getPeople(peopleId: string): Observable<People> {
    if (!this.apiEndpoint || !peopleId) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} peopleId = ${peopleId}`);
    }
    return this.httpClient.get<People>(`${this.apiEndpoint}/people/${peopleId}`);
  }

  search(searchedValue: string): Observable<SWAPIResponse<People>> {
    if (!this.apiEndpoint || !searchedValue) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} searchedValue = ${searchedValue}`);
    }
    return this.httpClient.get<SWAPIResponse<People>>(`${this.apiEndpoint}/people/?search=${searchedValue}`);
  }

}
