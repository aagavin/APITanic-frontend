import { Component } from '@angular/core';
import { ToastController, LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { forkJoin } from "rxjs/observable/forkJoin";
import { UserProvider } from '../../providers/user/user';
import { ImdbProvider } from '../../providers/imdb/imdb';

@IonicPage()
@Component({
  selector: 'page-recommendations',
  templateUrl: 'recommendations.html',
})
export class RecommendationsPage {

  private recommendationsIds: Array<string>;
  public recommendations: Array<object>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private imdbProvider: ImdbProvider,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {
    this.recommendationsIds = new Array<string>();
    this.getRecommendations();
  }

  private getRecommendations(){
    this.userProvider.getRecommendations().subscribe(
      results => this.recommendationsIds = results['data']['recommendations'],
      err => console.log(err),
      () => this.getMovieInfo()
    );
  }

  private getMovieInfo() {
    let observableList = this.recommendationsIds.map((value: string) => {
      return this.imdbProvider.getMovieById(value)
    });

    forkJoin(observableList).subscribe(results => {
      this.recommendations = results.map(result => result['data']['movie'])
    });

  }

  private sendToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 3000
    }).present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendationsPage');
  }

  public addFavourite(imdbId: string) {
    let loading = this.loadingController.create({
      content: `Adding a favourite`
    });
    loading.present();

    console.log(imdbId);

    this.userProvider.addToFavourites(imdbId).subscribe(
      response => {
        if (!response['data']['success']) {
          this.sendToast(response['data']['message'])
        }
        else {
          this.sendToast('Favourite added')
        }
      },
      err => console.log(err),
      () => {loading.dismiss();this.getRecommendations()}
    );
  }

}
