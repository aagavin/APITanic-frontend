import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { forkJoin } from "rxjs/observable/forkJoin";
import { ImdbProvider } from '../../providers/imdb/imdb';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  public favourites: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private imdbProvider: ImdbProvider) {
    this.favourites = new Array<object>();
  }

  async ionViewDidLoad() {
    this.getFavourites();
  }

  private getFavourites() {
    this.userProvider.getAllFavourites().subscribe(
      response => this.getMovieData(response['data']['favourites']),
      err => console.log(err),
      () => console.log('done getting logs')
    );
  }

  public removeFavourite(imdbid: string) {
    console.log(imdbid);

    this.userProvider.removeFavourite(imdbid).subscribe(
      response => console.log(response),
      err => console.log(err),
      () => { console.log('done removeing favourite'); this.getFavourites() }
    )

  }

  /**
   * Gets movie data from a list of favourites
   * 
   * @private
   * @param {any} favourties 
   * @memberof FavouritesPage
   */
  private getMovieData(favourties) {

    let observableList = [];

    favourties.forEach(value => observableList.push(this.imdbProvider.getMovieById(value.imdb_id)));

    forkJoin(observableList).subscribe(results => {
      this.favourites = results.map(result => result['data']['movie']),
        err => console.log(err),
        () => console.log(this.favourites)
    });
  }


}
