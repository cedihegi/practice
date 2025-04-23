import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Card, Deck, card_colors, card_values } from './models/cards';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jassmemory',
  standalone: true,
  imports: [HeaderComponent, CardComponent, CommonModule],
  templateUrl: './jassmemory.component.html',
  styleUrl: './jassmemory.component.scss'
})
export class JassmemoryComponent {
  stage: "start" | "show-cards" | "pick-cards" | "show-result" = "start"
  deck?: Deck;
  shownCards: Card[] = []
  currentCardIndex = 0;
  numberOfCardsToShow: number = 5;
  selectedCards: Card[] = []

  orderedDeck: Deck = new Deck();
  // evaluation:
  wrongPicks: Card[] = [];
  missedPicks: Card[] = [];

  startGame() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.shownCards = [];
    this.currentCardIndex = 0;
    this.showNext()
    this.stage = "show-cards"
  }

  showNext() {
    if (this.currentCardIndex < this.numberOfCardsToShow && this.deck) {
      this.shownCards.push(this.deck.cards[this.currentCardIndex]);
      this.currentCardIndex++;
    } else {
      console.error("this should be unreachable")
    }
  }

  startTest() {
    this.stage = "pick-cards"
    this.selectedCards = []
  }

  onSelect([card, selected]: [Card, boolean]) {
    console.log("selected card: ", card.value, card.color, selected)
    const exists = this.selectedCards.some(c => c.equals(card));
    if (selected && !exists) {
      this.selectedCards.push(card);
    } else if (!selected) {
      this.selectedCards = this.selectedCards.filter(c => !c.equals(card));
    }
  }

  submit() {
    this.wrongPicks = [];
    this.missedPicks = [];
    for (var card of this.shownCards) {
      if (!this.selectedCards.some(c => c.equals(card))) {
        this.missedPicks.push(card)
      }
    }
    for (var card of this.selectedCards) {
      if (!this.shownCards.some(c => c.equals(card))) {
        this.wrongPicks.push(card)
      }
    }
    this.stage = "show-result";
  }
}
