import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class AuthProvider {

  isAuthenticated: boolean = false;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async checkIsAuthenticated () 
  {
    let now = Date.now();
    let auth: any = await this.storage.get('auth')
    if (!!!auth)
      return false;
    if ( auth.expired_at <= now)
      return false;

    return true;
  }

  login (user: any) 
  {
    let request = {
      'grant_type': 'password',
      'client_id': Service.passport.client_id,
      'client_secret': Service.passport.client_secret,
      'username': user.email,
      'password': user.password,
    }

    return this.http.post(`${Service.url}/oauth/token`, request).toPromise();
  }

  register (user: any) 
  {
    return this.http.post(`${Service.apiUrl}/register`, user).toPromise();
  }

  removeCredentials () {
    this.storage.remove('auth');
  }

  storeCredentials (response: any) {
    let expired_at = (response.expires_in * 1000) + Date.now();

    this.storage.set('auth', {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      expired_at
    })
  }

}
