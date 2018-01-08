import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { ImdbProvider } from '../../../providers/imdb/imdb';

@IonicPage()
@Component({
  selector: 'page-movie-info',
  templateUrl: 'movie-info.html',
})
export class MovieInfoPage {

  public movie: any = {};
  public isLoggedIn:boolean;

  constructor(
    private imdbProvider: ImdbProvider,
    private navCtrl: NavController,
    private loadingController:LoadingController,
    private toastController: ToastController,
    public navParams: NavParams,
    public userProvider: UserProvider,    
  ) {
    this.isLoggedIn = false;

    let imdbid = this.navParams.get('imdbid');

    this.imdbProvider.getMovieById(imdbid).subscribe(
      response => this.movie = response['data']['movie'],
      err => { console.log(err); this.navCtrl.setRoot('HomePage') },
      () => console.log()
    );
  }

  ionViewDidLoad() {}

  public addToFavourites(imdbId: string) {
    let loading = this.loadingController.create({
      content: `Adding ${this.movie.Title}`
    });
    loading.present();

    console.log(imdbId);
        
    this.userProvider.addToFavourites(imdbId).subscribe(
      response => {
        if(!response['data']['success']){
          this.sendToast(response['data']['message'])
        }
        else{
          this.sendToast('Favourite added')
        }
      },
      err => console.log(err),
      () => loading.dismiss()
    )
  }

  private sendToast(message: string){
    this.toastController.create({
      message: message,
      duration: 3000
    }).present()
  }

}
