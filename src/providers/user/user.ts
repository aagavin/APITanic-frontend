import { SignUpUser } from '../../models/sign-up-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsProvider } from '../globals/globals';

import { AngularFireAuth } from 'angularfire2/auth';
// needed for tree shakeing
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserProvider {

  public isLoggedIn: Subject<boolean>;
  public isLoggedInBool: boolean;

  private token: string;
  private readonly favouriteUrl = `${GlobalsProvider.BASEURL}/favourites`;
  private readonly friendUrl = `${GlobalsProvider.BASEURL}/friends`

  constructor(private http: HttpClient, private _afAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
    this.isLoggedIn = new Subject<boolean>();
    this.isLoggedIn.next(false);
    this._afAuth.authState.subscribe(async (user: firebase.User) => {
      try {
        this.token = await user.getIdToken();
        console.log(this.token);
        this.isLoggedIn.next(true);
        this.isLoggedInBool = true;
      }
      catch (e) {
        this.isLoggedIn.next(false);
        this.isLoggedInBool = false;
        this.token = '';
      }
    });
  }

  /**
   * Getter for user token
   * 
   * @readonly
   * @type {String}
   * @memberof UserProvider
   */
  public get $token(): String { return this.token; }

  public get $isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  /**
   * Creats a new user
   * 
   * @param {SignUpUser} signUpUser 
   * @returns {Promise<boolean>} 
   * @memberof UserProvider
   */
  public async createUser(signUpUser: SignUpUser): Promise<boolean> {
    let payload = {
      "password": signUpUser.password,
      "displayName": signUpUser.displayName,
      "email": signUpUser.email
    }

    try {
      await this.http
        .post(`${GlobalsProvider.BASEURL}/user/`, payload, { headers: new HttpHeaders().set('content-type', 'application/json') })
        .toPromise();
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }

  }

  public getAllFavourites(): Observable<object> {
    // let url = `${GlobalsProvider.BASEURL}/favourites`;
    let getFavHeaders = new HttpHeaders()
      .set('token', this.token);
    return this.http.get(this.favouriteUrl, { headers: getFavHeaders, })
  }

  /**
   * Adds an item as a favourite
   * 
   * @param {string} imdbId 
   * @returns {Observable<object>} 
   * @memberof UserProvider
   */
  public addToFavourites(imdbId: string): Observable<object> {
    // let url = `${GlobalsProvider.BASEURL}/favourites`;

    let addFavHeaders = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('token', this.token);
    return this.http.post(this.favouriteUrl, { "imdbId": imdbId }, { headers: addFavHeaders, });
  }


  public removeFavourite(imdbId: string): Observable<object> {
    // favouriteUrl
    let deleteFavHeaders = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('imdbId', imdbId)
      .set('token', this.token);
    return this.http.delete(this.favouriteUrl, { headers: deleteFavHeaders})    
  }

  public searchFriends(query: string): Observable<object>{
    const userUrl = `${GlobalsProvider.BASEURL}/user?q=${query}`;
    let friHeaders = new HttpHeaders()
      .set('token', this.token);
    return this.http.get(userUrl, { headers: friHeaders});
  }

  public addFriend(uid: string): Observable<object>{
    let friHeaders = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('token', this.token);
    return this.http.post(this.friendUrl, {"friend_id":uid }, {headers: friHeaders});
  }

  /**
   * Sign in a user
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<any>} 
   * @memberof UserProvider
   */
  public async signIn(email: string, password: string): Promise<any> {
    await this._afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  /**
   * Signs out a user
   * 
   * @returns {Promise<any>} 
   * @memberof UserProvider
   */
  public async signOut(): Promise<any> {
    return this._afAuth.auth.signOut();
  }

}
