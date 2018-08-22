import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { decodeLaravelErrors } from '../../functions/Helpers';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  segment: string = "login";
  loading: any;
  formLogin: any = {
    email: '',
    password: '',
  };
  formRegister: any = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private authService: AuthProvider
  ) {
    this.loading = this.loadingCtrl.create({content: 'Please wait ...'});
  }

  ionViewDidLoad() {
    this.checkAuthenticated();
  }

  async checkAuthenticated () 
  {
    try {
      let isAuthenticated = await this.authService.checkIsAuthenticated();
      if ( isAuthenticated ) {
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(HomePage)
      }
    } catch (err) {
      console.log(err);
      let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on verify authentication info', buttons: ['Ok'] });
      alert.present();
    }
  }

  doLogin (data: any) 
  {
    this.loading.present();
    this.authService.login(data)
      .then((response: any) => {
        this.loading.dismiss();
        this.authService.storeCredentials(response);
        setTimeout(() => {
          this.checkAuthenticated()
        }, 750);
      })
      .catch(err => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok'] });
        if ( err.status == 400 ) {
          alert.setMessage(`${err.error.hint}`);
        } else if (err.status == 401) {
          alert.setMessage(`${err.error.message}`);
        } else {
          alert.setMessage('Unknow error on login');
        }
        alert.present();
      })
  }

  doRegister () 
  {
    this.loading.present();
    this.authService.register(this.formRegister)
      .then((response: any) => {
        this.loading.dismiss();
        console.log(response)
        this.doLogin({
          email: this.formRegister.email,
          password: this.formRegister.password,
        });
      })
      .catch((err: any) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
        if (err.status == 422) {
          let decodedErrors: any = decodeLaravelErrors(err)
          alert.setMessage(decodedErrors.errors.join('<br>'));
        } else {
          alert.setMessage('Unknow error on register');
        }
        alert.present();
      })
  }

  validateLoginData (data: any) 
  {
    return true;
  }

}
