import {UserProvider} from '../../../providers/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public signInFrom: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _formBuilder: FormBuilder,
    private _userProvider: UserProvider
  ) {
    this.signInFrom = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, ]],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  public createAccountPage(){
    this.navCtrl.setRoot('SingupPage');
  }


  public onSubmit(){
    console.log(this.signInFrom.value);
    this._userProvider.signIn(this.signInFrom.value.email, this.signInFrom.value.password)
  }

}
