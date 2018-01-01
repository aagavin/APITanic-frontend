import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SigninPage } from './signin';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninPage),
    FormsModule
  ],
})
export class SigninPageModule {}
