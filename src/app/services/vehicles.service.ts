import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Vehicles, SWAPIResponse } from '../models';
import { APP_ENV } from '../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private apiEndpoint: string;

  constructor(@Inject(APP_ENV) private env: any, private httpClient: HttpClient) {
    this.apiEndpoint = env.apiEndpoint;
  }

  /**
   * Get All vehicles from SWAPI endpoint
   * @throws Error if apiEndPoint is not defined
   */
  getAllVehicles(page?: number): Observable<SWAPIResponse<Vehicles>> {
    if (!this.apiEndpoint) {
      return throwError(`apiEndPoint is not defined = ${this.apiEndpoint}`);
    }
    const pagination = page ? `?page=${page}` : '';
    return this.httpClient.get<SWAPIResponse<Vehicles>>(`${this.apiEndpoint}/vehicles/${pagination}`);
  }

  /**
   * Get a specific vehicles by url id
   * @throws Error if apiEndPoint is not defined or @param vehiclesId is not defined
   */
  getVehicles(vehiclesId: string): Observable<Vehicles> {
    if (!this.apiEndpoint || !vehiclesId) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} vehiclesId = ${vehiclesId}`);
    }
    return this.httpClient.get<Vehicles>(`${this.apiEndpoint}/vehicles/${vehiclesId}`);
  }

  search(searchedValue: string): Observable<SWAPIResponse<Vehicles>> {
    if (!this.apiEndpoint || !searchedValue) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} searchedValue = ${searchedValue}`);
    }
    return this.httpClient.get<SWAPIResponse<Vehicles>>(`${this.apiEndpoint}/vehicles/?search=${searchedValue}`);
  }

}
