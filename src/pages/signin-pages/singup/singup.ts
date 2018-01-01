import { UserProvider } from '../../../providers/user/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  public signUpFrom: FormGroup;
  public errorMessage: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _formBuilder: FormBuilder,
    private _userProvider: UserProvider

  ) {
    this.signUpFrom = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      displayName: [null, [Validators.required]],
      password: [null, [Validators.required, ]],
      passwordVerify: [null, Validators.required],
    });
  
    this.errorMessage = '';

    this.signUpFrom.valueChanges.subscribe(val => {
      if(val.password !== val.passwordVerify){
        this.signUpFrom.controls['passwordVerify'].setErrors({'incorrect': true});
      }
    })

  }

  ionViewDidLoad() {
  }

  public onSubmit(){
    this._userProvider.createUser(this.signUpFrom.value)
    .then(success => {
      if (success) {
        this.navCtrl.setRoot('HomePage');
      }
    })
    .catch(err => console.log(err))
  }

}
