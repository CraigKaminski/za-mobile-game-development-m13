import { Game } from '../states/Game';

export interface IThingData {
  asset: string;
  text: string;
  type: string;
  x: number;
  y: number;
}

export class Thing extends Phaser.Sprite {
  public data: IThingData;
  private state: Game;

  constructor(state: Game, data: IThingData) {
    super(state.game, data.x, data.y, data.asset);

    this.data = data;
    this.state = state;
    this.anchor.setTo(0.5);

    this.inputEnabled = true;
    this.input.pixelPerfectClick = true;
    this.events.onInputDown.add(this.touch, this);
  }

  private touch() {
    this.state.panelLabel.text = this.data.text;
  }
}
