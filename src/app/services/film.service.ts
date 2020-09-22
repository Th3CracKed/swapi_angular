import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Film, SWAPIResponse } from '../models';
import { APP_ENV } from '../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiEndpoint: string;

  constructor(@Inject(APP_ENV) private env: any, private httpClient: HttpClient) {
    this.apiEndpoint = env.apiEndpoint;
  }

  /**
   * Get All films from SWAPI endpoint
   * @throws Error if apiEndPoint is not defined
   */
  getAllFilms(): Observable<SWAPIResponse<Film>> {
    if (!this.apiEndpoint) {
      return throwError(`apiEndPoint is not defined = ${this.apiEndpoint}`);
    }
    return this.httpClient.get<SWAPIResponse<Film>>(`${this.apiEndpoint}/films`);
  }

  /**
   * Get a specific film by url id
   * @throws Error if apiEndPoint is not defined or @param filmId is not defined
   */
  getFilm(filmId: string): Observable<Film> {
    if (!this.apiEndpoint || !filmId) {
      return throwError(`A param is not defined apiEndPoint = ${this.apiEndpoint} filmId = ${filmId}`);
    }
    return this.httpClient.get<Film>(`${this.apiEndpoint}/films/${filmId}`);
  }

}
