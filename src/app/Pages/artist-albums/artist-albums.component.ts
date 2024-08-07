import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlbumComponent } from '../../components/album/album.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistSearchService } from '../../Services/artist-search/artist-search.service';

@Component({
  selector: 'app-artist-albums',
  standalone: true,
  imports: [CommonModule, AlbumComponent],
  templateUrl: './artist-albums.component.html',
  styleUrl: './artist-albums.component.css',
})
export class ArtistAlbumsComponent implements OnInit {
  artistId!: string;
  artistName!: string;
  albums: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistSearchService: ArtistSearchService
  ) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
    this.route.queryParams.subscribe((params) => {
      this.artistName = params['name'];
    });
    this.getAlbums();
  }

  getAlbums() {
    this.artistSearchService
      .getAlbums(this.artistId)
      .subscribe((response: any) => {
        this.albums = response.items.map((album: any) => {
          return {
            ...album,
            artistsNames: album.artists.map((a: any) => a.name).join(', '),
          };
        });
      });
  }
}
