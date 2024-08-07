import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [NgFor],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.css',
})
export class RatingInputComponent {
  @Input() maxRating: number = 5;
  @Input() currentRating: number = 0;
  @Output() ratingSelected: EventEmitter<number> = new EventEmitter<number>();

  selectRating(rating: number) {
    this.currentRating = rating;
    this.ratingSelected.emit(this.currentRating);
  }
}
