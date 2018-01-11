import { UserProvider } from '../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-search-friends',
  templateUrl: 'search-friends.html',
})
export class SearchFriendsPage {

  public searchQuery: string;
  public searchResults: Array<object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private alertCtrl: AlertController) {
    this.searchQuery = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFriendsPage');
  }

  public search() {
    if (this.searchQuery != '') {
      this.userProvider.searchFriends(this.searchQuery).subscribe(
        results => this.searchResults = results['data']['results'],
        err => console.log(err),
        () => console.log(this.searchResults)
      );
    }
  }

  public friendClick(uid: string) {
    this.userProvider.addFriend(uid).subscribe(
      results => {
        if (results['error'] === 'Error with adding friend') {
          this.showAlert('Error', 'Friend Not Added');
        } else {
          this.showAlert('Success', 'Friend Added');
        }

      },
      err => console.log(err),
      () => console.log('sdf')
    );
  }

  private showAlert(title: string, message: string) {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    }).present();
  }

}
