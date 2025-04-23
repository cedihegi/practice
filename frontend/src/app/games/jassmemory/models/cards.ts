export const card_colors = ["schilten", "schellen", "rosen", "eicheln"] as const
type CardColor = typeof card_colors[number]

export const card_values = ["6", "7", "8", "9", "10", "under", "ober", "koenig", "ass"] as const
type CardValue = typeof card_values[number]

export interface ICard {
  color: CardColor;
  value: CardValue;
}

export class Card implements ICard {
  constructor(
    public color: CardColor,
    public value: CardValue,
  ) { }
  getImagePath(): string {
    return `images/jasskarten/${this.color}_${this.value}.jpg`
  }

  equals(other: Card): boolean {
    return this.color === other.color && this.value === other.value
  }
}


export class Deck {
  cards: Card[] = [];

  constructor() {
    this.generateDeck();
  }

  private generateDeck() {
    for (const color of card_colors) {
      for (const value of card_values) {
        this.cards.push(new Card(color, value));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

export const orderedDeck: Deck = new Deck();
