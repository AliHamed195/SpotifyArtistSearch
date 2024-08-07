import { Component } from '@angular/core';
import { SpotifyAuthService } from '../../Services/auth/spotify-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private spotifyAuthService: SpotifyAuthService) {}

  login() {
    localStorage.removeItem('artist-search-query');
    this.spotifyAuthService.login();
  }
}
