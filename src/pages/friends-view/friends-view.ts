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
    this.getFriends();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsViewPage');
  }

  public removeFriend(friendId: string) {
    console.log(friendId);
    this.userProvider.removeFriend(friendId).subscribe(
      results => console.log(results),
      err => console.log(err),
      () =>  this.getFriends()
    );

  }

  private getFriends() {
    this.friends = [];
    this.userProvider.getAllFriends().subscribe(
      results => this.friends = results['data']['friends'],
      err => console.log(err),
      () => console.log(this.friends)
    );
  }

}
