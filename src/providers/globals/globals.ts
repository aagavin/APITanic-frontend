import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {

  public static readonly BASEURL:string = 'https://aaronfernandescc-eval-prod.apigee.net/apitanic';
  
  constructor() { console.log('Hello GlobalsProvider Provider'); }

}
