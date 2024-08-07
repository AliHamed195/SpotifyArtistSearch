import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RatingInputComponent } from '../rating-input/rating-input.component';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [CommonModule, RatingInputComponent],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.css',
})
export class ArtistCardComponent {
  @Input() artistId!: string;
  @Input() artistImage!: string;
  @Input() artistName!: string;
  @Input() followers!: number;
  @Input() popularity!: number;

  constructor(private router: Router) {}

  getAlbums() {
    this.router.navigate(['/artist', this.artistId, 'albums'], {
      queryParams: { name: this.artistName },
    });
  }

  onRatingSelected(rating: number) {
    // console.log(`Selected rating: ${rating}`);
  }
}
