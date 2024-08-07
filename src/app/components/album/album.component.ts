import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  @Input() albumCover!: string;
  @Input() albumName!: string;
  @Input() albumArtists!: string;
  @Input() releaseYear!: string;
  @Input() totalTracks!: number;
  @Input() spotifyLink!: string;
}
