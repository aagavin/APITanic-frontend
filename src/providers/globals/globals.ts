import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {

  public static readonly BASEURL:string = 'https://apitanic.herokuapp.com/';
  
  constructor() { console.log('Hello GlobalsProvider Provider'); }

}
