export const Service: any = {

    /**
     * Url of your Laravel Project
     */
    url: 'http://127.0.0.1:800',
    apiUrl: 'http://127.0.0.1:800/api',

    /**
     * Info of your passport client, usually second record on table "oauth_clients" in your database, name "Laravel Password Grant Client"
     */
    passport: {
        'grant_type': 'password',
        'client_id': 'your-client-id',
        'client_secret': 'your-client-secret',
    }

};