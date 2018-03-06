interface IPlayerData {
  room: string;
}

interface IRoomData {
  background: string;
}

export class Game extends Phaser.State {
  private playerData: IPlayerData;
  private roomData: IRoomData;

  public init(playerData: IPlayerData) {
    this.playerData = playerData ? { ...playerData } : { room: 'livingroom' };
  }

  public create() {
    const panel = this.add.sprite(0, 270, 'panel');

    this.loadRoom();
  }

  private loadRoom() {
    this.roomData = JSON.parse(this.cache.getText(this.playerData.room));

    const background = this.add.sprite(0, 0, this.roomData.background);
  }
}
