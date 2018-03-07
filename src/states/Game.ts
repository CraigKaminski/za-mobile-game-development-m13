import { IItemData, Item } from '../prefabs/Item';
import { IThingData, Thing } from '../prefabs/Thing';

export interface IPlayerData {
  room: string;
  items: IItemData[];
}

interface IRoomData {
  background: string;
  things: IThingData[];
}

export class Game extends Phaser.State {
  public items: Phaser.Group;
  public panelLabel: Phaser.Text;
  public selectedItem: Item | null;
  private playerData: IPlayerData;
  // private roomData: IRoomData;
  private things: Phaser.Group;

  public init(playerData: IPlayerData) {
    const defaultPlayerData: IPlayerData = {
      items: [],
      room: 'livingroom',
    };

    this.playerData = { ...defaultPlayerData, ...playerData };
  }

  public create() {
    const panel = this.add.sprite(0, 270, 'panel');
    const style = {
      align: 'left',
      fill: '#fff',
      font: '16px Prstart',
      wordWrap: true,
      wordWrapWidth: 400,
    };
    this.panelLabel = this.add.text(10, 290, '', style);

    this.loadRoom();

    this.items = this.add.group();

    this.showItems();
  }

  public addItem(itemData: IItemData) {
    const item = new Item(this, 420 + this.items.length * 80, 310, itemData);
    this.items.add(item);
    return item;
  }

  public clearSelection() {
    this.selectedItem = null;
    this.items.setAll('alpha', 1);
  }

  public selectItem(item: Item) {
    if (this.selectedItem !== item) {
      this.clearSelection();
      this.selectedItem = item;
      this.selectedItem.alpha = 0.5;
    } else {
      this.clearSelection();
    }
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

  private showItems() {
    this.playerData.items.forEach((itemData) => {
      this.addItem(itemData);
    }, this);
  }
}
