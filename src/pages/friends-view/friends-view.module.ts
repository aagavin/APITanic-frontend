import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsViewPage } from './friends-view';

@NgModule({
  declarations: [
    FriendsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsViewPage),
  ],
})
export class FriendsViewPageModule {}
