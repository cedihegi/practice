import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../models/cards'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card!: Card;
  /** height of the card in pixels, width is adjusted automatically */
  @Input() size = 50;
  @Input() flipped: boolean = false;
  @Input() disableFlipping: boolean = false;

  /** emits an event when a card is clicked. Boolean is true when selected,
  * false when "deselected" i.e. clicked again */
  @Output() selected = new EventEmitter<[Card, boolean]>();

  flip() {
    console.log("flipping card")
    if (!this.disableFlipping) {
      this.flipped = !this.flipped;
    }
  }

  select() {
    this.flip()
    // flipped means it was selected
    this.selected.emit([this.card, this.flipped])
  }
}
