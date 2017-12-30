import { ImdbProvider } from '../../../providers/imdb/imdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-movie-info',
  templateUrl: 'movie-info.html',
})
export class MovieInfoPage {

  public movie: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private _imdbProvider: ImdbProvider) {
    
    let imdbid = this.navParams.get('imdbid');
    // let movie = this._imdbProvider.getMovieById(imdbid).subscribe()
    this._imdbProvider.getMovieById(imdbid).subscribe(
      response => { this.movie = response['data']['movie'];},
      err => {console.log(err); this.navCtrl.setRoot('HomePage')},
      () => {console.log(this.movie)}
    );

  }

  ionViewDidLoad() {

  }

}
