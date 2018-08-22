import { Component } from '@angular/core';
import { NavController, AlertController, Alert } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: boolean = false;
  user: any;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthProvider,
    private userService: UserProvider
  ) {
  }

  async ionViewCanEnter () {
    let isAuthenticated = await this.authService.checkIsAuthenticated();
    return isAuthenticated;
  }

  ionViewDidLoad() {
    this.getUser();
  }

  getUser () 
  {
    this.loading = true;
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading = false;
        this.user = response;
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

}
