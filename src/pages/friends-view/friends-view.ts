import { UserProvider } from '../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-friends-view',
  templateUrl: 'friends-view.html',
})
export class FriendsViewPage {

  public friends: Array<object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
    this.friends = [];

    this.userProvider.getAllFriends().subscribe(
      results => this.friends = results['data']['friends'],
      err => console.log(err),
      ()=> console.log(this.friends)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsViewPage');
  }

  public removeFriend(friendId: string){
    console.log(friendId);
    this.userProvider.removeFavouri

  }

}
