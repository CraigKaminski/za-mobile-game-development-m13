interface IThingData {
  asset: string;
  x: number;
  y: number;
}

export class Thing extends Phaser.Sprite {
  private state: Phaser.State;
  
  constructor(state: Phaser.State, data: IThingData) {
    super(state.game, data.x, data.y, data.asset);

    this.state = state;
    this.anchor.setTo(0.5);
  }
}
