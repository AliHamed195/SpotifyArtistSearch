import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../../Services/auth/spotify-auth.service';
import { ArtistSearchService } from '../../Services/artist-search/artist-search.service';
import { ArtistCardComponent } from '../../components/artist-card/artist-card.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingInputComponent } from '../../components/rating-input/rating-input.component';

@Component({
  selector: 'app-artist-search',
  standalone: true,
  imports: [ArtistCardComponent, RatingInputComponent, NgFor, FormsModule],
  templateUrl: './artist-search.component.html',
  styleUrl: './artist-search.component.css',
})
export class ArtistSearchComponent implements OnInit {
  searchQuery: string = '';
  artists: any[] = [];

  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private artistSearchService: ArtistSearchService
  ) {}

  ngOnInit(): void {
    //this.spotifyAuthService.handleAuthCallback();
    this.searchQuery = localStorage.getItem('artist-search-query') || '';
    if (this.searchQuery !== '') {
      this.search();
    }
  }

  search() {
    // console.log('search parameter:', this.searchQuery);
    this.artistSearchService
      .searchArtists(this.searchQuery)
      .subscribe((response) => {
        localStorage.setItem('artist-search-query', this.searchQuery);
        this.artists = response.artists.items;
        // console.log(response);
      });
  }
}
