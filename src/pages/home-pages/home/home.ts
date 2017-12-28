import { ImdbProvider } from '../../../providers/imdb/imdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public popularMovies: object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _imdbProvider: ImdbProvider
  ) {
    this._imdbProvider.getMostPopularMovies().subscribe(
      data => {
        this.popularMovies = data['data']['movies'];
      },
      err => console.log(err),
      () => console.log('done loading popular movies')

    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  public movieClick(imdbid: number):void{
    this.navCtrl.push('MovieInfoPage', {'imdbid': imdbid});
  }

}
