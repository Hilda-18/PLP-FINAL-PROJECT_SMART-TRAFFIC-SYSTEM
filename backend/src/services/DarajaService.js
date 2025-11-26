import fetch from 'node-fetch';
import base64 from 'base-64';

const DAR_URLS = {
  sandbox: {
    oauth: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    stkpush: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
  },
  production: {
    oauth: 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    stkpush: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
  }
};

export default class DarajaService {
  constructor() {
    this.consumerKey = process.env.DARAJA_CONSUMER_KEY;
    this.consumerSecret = process.env.DARAJA_CONSUMER_SECRET;
    this.shortcode = process.env.DARAJA_SHORTCODE;
    this.passkey = process.env.DARAJA_PASSKEY;
    this.callbackUrl = process.env.DARAJA_CALLBACK_URL;
    this.env = (process.env.DARAJA_ENV === 'production') ? 'production' : 'sandbox';
    this.isConfigured = !!(this.consumerKey && this.consumerSecret && this.shortcode && this.passkey && this.callbackUrl);
  }

  async getAccessToken() {
    const url = DAR_URLS[this.env].oauth;
    const credential = base64.encode(`${this.consumerKey}:${this.consumerSecret}`);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credential}`
      }
    });
    const data = await res.json();
    if (!data.access_token) throw new Error('Failed to obtain Daraja access token: ' + JSON.stringify(data));
    return data.access_token;
  }

  async initiateStkPush({ amount, phone, accountRef = 'Order', description = 'Payment', orderId = null }) {
    const url = DAR_URLS[this.env].stkpush;
    const token = await this.getAccessToken();

    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0,14); // YYYYMMDDHHMMSS
    const password = base64.encode(`${this.shortcode}${this.passkey}${timestamp}`);

    const body = {
      BusinessShortCode: this.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: this.shortcode,
      PhoneNumber: phone,
      CallBackURL: this.callbackUrl,
      AccountReference: accountRef,
      TransactionDesc: description
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    return data;
  }
}
