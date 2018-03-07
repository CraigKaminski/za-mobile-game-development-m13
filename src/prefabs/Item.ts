import { Game } from '../states/Game';

export interface IItemData {
  asset: string;
  id?: string;
}

export class Item extends Phaser.Sprite {
  public data: IItemData;
  private state: Game;

  constructor(state: Game, x: number, y: number, data: IItemData) {
    super(state.game, x, y, data.asset);

    this.state = state;
    this.data = data;
    this.anchor.setTo(0.5);

    this.inputEnabled = true;
    this.input.pixelPerfectClick = true;
    this.events.onInputDown.add(this.state.selectItem, this.state);
  }
}
