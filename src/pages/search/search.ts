import {ImdbProvider} from '../../providers/imdb/imdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public searchQuery:string;
  public searchResults: Array<object>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _imdbProvider: ImdbProvider
  ) {
    this.searchQuery = '';
    this.searchResults = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  public search(event: Event){
    if (this.searchQuery.length > 2) {
      this._imdbProvider.getImdbSearch(this.searchQuery).subscribe(
        data => this.searchResults = data['data']
      );      
    }
  }

  public movieClick(imdbid: string) {
    this.navCtrl.push('MovieInfoPage', {'imdbid': imdbid});    
  }

}
