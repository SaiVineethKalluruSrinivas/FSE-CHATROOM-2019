import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupService } from './signup-service';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [ SignupService ]
})
export class SignupPage {

	username: String;
	password: String;
  answer: String;


  constructor(private signupService: SignupService, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup()
  {
  	let newUser = {
      username : this.username,
      password : this.password
    }
    
    this.username = '';
    this.password = '';

    this.signupService.addUser(newUser)
      .subscribe( (response: any) => {
          if(response.status == 'User is present')
          {
            this.errorToast();
          }
          else
          {
            this.successToast();
          }
      });

  }


  successToast() {
  let toast = this.toastCtrl.create({
    message: 'User was added successfully',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}


 errorToast() {
  let toast1 = this.toastCtrl.create({
    message: 'Username is already present',
    duration: 3000,
    position: 'bottom'
  });

  toast1.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast1.present();
}


}


