import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistSearchService {
  private apiUrl = 'https://api.spotify.com/v1/search';
  private accessToken = localStorage.getItem('spotify_access_token');

  constructor(private http: HttpClient) {}

  searchArtists(query: string): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', 'artist')
      .set('limit', '12');

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    return this.http.get(this.apiUrl, { headers, params });
  }

  getAlbums(artistId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      { headers }
    );
  }
}
