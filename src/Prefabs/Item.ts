interface IItemData {
  asset: string;
}

export class Item extends Phaser.Sprite {
  private state: Phaser.State;
  
  constructor(state: Phaser.State, x: number, y: number, data: IItemData) {
    super(state.game, x, y, data.asset);

    this.state = state;
    this.anchor.setTo(0.5);
  }
}
