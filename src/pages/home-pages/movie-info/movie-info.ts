import { ImdbProvider } from '../../../providers/imdb/imdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-movie-info',
  templateUrl: 'movie-info.html',
})
export class MovieInfoPage {

  public movie: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _imdbProvider: ImdbProvider) {
    this.movie = {};
  }

  ionViewDidLoad() {
    let imdbid = this.navParams.get('imdbid');
    this._imdbProvider.getMovieById(imdbid).subscribe(
      data => { this.movie = data['data']; console.log(data['data']) },
      err => console.log(err),
      () => console.log('done loading movie with id: '+imdbid)
    );

  }

}
