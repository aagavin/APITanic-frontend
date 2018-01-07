import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {

  public static readonly BASEURL:string = 'https://aaronfernandescc-eval-prod.apigee.net/apitanic';
  // public static readonly BASEURL:string = 'http://127.0.0.1:8000';
  
  constructor() { console.log('Hello GlobalsProvider Provider'); }

}
