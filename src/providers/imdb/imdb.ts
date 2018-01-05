import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsProvider } from '../globals/globals';

@Injectable()
export class ImdbProvider {

  constructor(private _http: HttpClient) {
    console.log('Hello ImdbProvider Provider');
  }

  public getMostPopularMovies():Observable<object> {
    let url = `${GlobalsProvider.BASEURL}/imdb/popular`;  
    return this._http.get(url);
  }

  public getMovieById(imdbid: string): Observable<object>{
    let url = `${GlobalsProvider.BASEURL}/imdb/title/${imdbid}`;
    return this._http.get(url);
  }

  public getImdbSearch(query: string): Observable<object>{
    let url = `${GlobalsProvider.BASEURL}/imdb/search?q=${query}`;
    return this._http.get(url);
  }
}
