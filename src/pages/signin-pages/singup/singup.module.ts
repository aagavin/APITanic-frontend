import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { SingupPage } from './singup';

@NgModule({
  declarations: [
    SingupPage,
  ],
  imports: [
    IonicPageModule.forChild(SingupPage),
    FormsModule
  ],

})
export class SingupPageModule {}
