import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Species, SWAPIResponse } from '../models';
import { APP_ENV } from '../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private apiEndpoint: string;

  constructor(@Inject(APP_ENV) private env: any, private httpClient: HttpClient) {
    this.apiEndpoint = env.apiEndpoint;
  }

  /**
   * Get All species from SWAPI endpoint
   * @throws Error if apiEndPoint is not defined
   */
  getAllSpecies(page?: number): Observable<SWAPIResponse<Species>> {
    if (!this.apiEndpoint) {
      return throwError(`apiEndPoint is not defined = ${this.apiEndpoint}`);
    }
    const pagination = page ? `?page=${page}` : '';
    return this.httpClient.get<SWAPIResponse<Species>>(`${this.apiEndpoint}/species/${pagination}`);
  }

  /**
   * Get a specific species by url id
   * @throws Error if apiEndPoint is not defined or @param speciesId is not defined
   */
  getSpecies(speciesId: string): Observable<Species> {
    if (!this.apiEndpoint || !speciesId) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} speciesId = ${speciesId}`);
    }
    return this.httpClient.get<Species>(`${this.apiEndpoint}/species/${speciesId}`);
  }

  search(searchedValue: string): Observable<SWAPIResponse<Species>> {
    if (!this.apiEndpoint || !searchedValue) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} searchedValue = ${searchedValue}`);
    }
    return this.httpClient.get<SWAPIResponse<Species>>(`${this.apiEndpoint}/species/?search=${searchedValue}`);
  }

}
