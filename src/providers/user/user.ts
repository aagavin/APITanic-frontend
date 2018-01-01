import { SignUpUser } from '../../models/sign-up-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsProvider } from '../globals/globals';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class UserProvider {

  constructor(public http: HttpClient, private _storage: Storage, private _afAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

/**
 * Creats a new user
 * 
 * @param {SignUpUser} signUpUser 
 * @returns {Promise<boolean>} 
 * @memberof UserProvider
 */
public async createUser(signUpUser: SignUpUser):Promise<boolean> {
    let payload = {
      "password": signUpUser.password,
      "displayName": signUpUser.displayName,
      "email": signUpUser.email
    }

    try {
      let results = await this.http
        .post(`${GlobalsProvider.BASEURL}/user/create`, payload, { headers: new HttpHeaders().set('content-type', 'application/json') })
        .toPromise();
      console.log(results);
      await this._storage.set('token', results['data']['token']);
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }

  }

  public signIn(email: string, password: string){
    this._afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

}
