import { UserProvider } from '../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-search-friends',
  templateUrl: 'search-friends.html',
})
export class SearchFriendsPage {

  public searchQuery: string;
  public searchResults: Array<object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFriendsPage');
  }

  public search() {
    if (this.searchQuery.length > 2) {
      this.userProvider.searchFriends
    }
  }

  public friendClick() {

  }

}
