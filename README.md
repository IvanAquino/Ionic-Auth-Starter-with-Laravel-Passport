#Ionic Auth starter with Laravel Passport

## Laravel setup
Run command

```
composer install
cp .env.example .env
php artisan key:generate
```

Configure your database in __.env__ file

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your-database-name
DB_USERNAME=homestead
DB_PASSWORD=secret
```

Run migrations

``` 
php artisan migrate
```

Install passport
```
php artisan passport:install
```

## Ionic setup

Install node modules
```
npm install
```

### Settings of passport client
Copy client credentials of passport from table oauth_clients usually is the second record

Client id 2 named Laravel Password Grant Client

Or create new client for ionic app and save __Client ID__ and __Client Secret__

```
php artisan passport:client --password
```

Enter to file src/settings/Laravel.ts and modify json config, replace url and apiUrl with your project url and your passport client credentials

```
// this example is running with php artisan serve
export const Service: any = {

    url: 'http://127.0.0.1:800',
    apiUrl: 'http://127.0.0.1:800/api',

    passport: {
        'grant_type': 'password',
        'client_id': 'your-client-id',
        'client_secret': 'your-client-secret',
    }

};
```

### Prevent enter to unauthorized pages

Import AuthProvider to your page

Example 
```
import { AuthProvider } from '../../providers/auth/auth';
```

And add this function

```
async ionViewCanEnter () {
    let isAuthenticated = await this.authService.checkIsAuthenticated();
    return isAuthenticated;
}
```