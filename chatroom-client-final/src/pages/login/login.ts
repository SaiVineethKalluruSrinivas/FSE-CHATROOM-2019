import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { LoginService } from './login-service';
import { ToastController } from 'ionic-angular';
import { User } from './user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {

  username: String;
  password: String;

  constructor(private socket: Socket, private toastCtrl: ToastController, private loginService: LoginService, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login()
  {

  	this.loginService.getUser(this.username).subscribe( (response: any) => {



  		if(response == null)
  		{
  			this.registerToast();
  		}

  		else if(response.username == this.username)
  		{
  			if(response.password == this.password){
  				// this.successToast();
          this.socket.connect();
          this.socket.emit('userconnect', this.username);
          this.navCtrl.push('ChatroomPage', { username: this.username});
        }

  			else
  				this.errorToast();

  		}

      });

  }


  registerToast()
  {

	let toast = this.toastCtrl.create({
    message: 'New here? Sign up to begin with',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();

  }

  errorToast()

  {

	let toast = this.toastCtrl.create({
    message: 'Sorry... wrong password',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();

  }

}
