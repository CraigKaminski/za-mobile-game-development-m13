import { IThingData, Thing } from '../prefabs/Thing';

interface IPlayerData {
  room: string;
}

interface IRoomData {
  background: string;
  things: IThingData[];
}

export class Game extends Phaser.State {
  public panelLabel: Phaser.Text;
  private playerData: IPlayerData;
  // private roomData: IRoomData;
  private things: Phaser.Group;

  public init(playerData: IPlayerData) {
    this.playerData = playerData ? { ...playerData } : { room: 'livingroom' };
  }

  public create() {
    const panel = this.add.sprite(0, 270, 'panel');
    const style = {
      align: 'left',
      fill: '#fff',
      font: '16px Arial',
      wordWrap: true,
      wordWrapWidth: 400,
    };
    this.panelLabel = this.add.text(10, 290, '', style);

    this.loadRoom();
  }

  private loadRoom() {
    const roomData: IRoomData = JSON.parse(this.cache.getText(this.playerData.room));

    const background = this.add.sprite(0, 0, roomData.background);

    this.things = this.add.group();
    roomData.things.forEach((thingData) => {
      const thing = new Thing(this, thingData);
      this.things.add(thing);
    });
  }
}
