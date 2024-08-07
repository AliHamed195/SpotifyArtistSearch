import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  private clientId = environment.spotifyClientId;
  private redirectUri = 'http://localhost:4200/search';
  private scope = 'user-read-private user-read-email';
  private authEndpoint = 'https://accounts.spotify.com/authorize';
  private tokenEndpoint = 'https://accounts.spotify.com/api/token';
  private stateKey = 'spotify_auth_state';

  constructor(private http: HttpClient, private router: Router) {}

  private generateRandomString(length: number): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  login() {
    const state = this.generateRandomString(16);
    localStorage.setItem(this.stateKey, state);
    const url = `${this.authEndpoint}?response_type=code&client_id=${
      this.clientId
    }&scope=${this.scope}&redirect_uri=${encodeURIComponent(
      this.redirectUri
    )}&state=${state}`;
    window.location.href = url;
  }

  handleAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const storedState = localStorage.getItem(this.stateKey);

    if (state === null || state !== storedState) {
      this.router.navigate(['/login'], {
        queryParams: { error: 'state_mismatch' },
      });
    } else {
      localStorage.removeItem(this.stateKey);
      this.exchangeToken(code);
    }
  }

  private exchangeToken(code: string | null) {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code || '')
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', environment.spotifyClientSecret);

    this.http
      .post(this.tokenEndpoint, body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .subscribe((response: any) => {
        localStorage.setItem('spotify_access_token', response.access_token);
        this.router.navigate(['/search']);
      });
  }
}
