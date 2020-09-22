import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Film, Films } from '../models';
import { APP_ENV } from '../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiEndpoint: string;

  constructor(@Inject(APP_ENV) private env: any, private httpClient: HttpClient) {
    this.apiEndpoint = env.apiEndpoint;
  }


  getAllFilms(): Observable<Films> {
    if (!this.apiEndpoint) {
      return throwError(`apiEndPoint is not defined = ${this.apiEndpoint}`);
    }
    return this.httpClient.get<Films>(`${this.apiEndpoint}/films`);
  }

  getFilmId(film: Film): string {
    const tokens = film.url.split('/');
    return tokens[tokens.length - 2];
  }

}
