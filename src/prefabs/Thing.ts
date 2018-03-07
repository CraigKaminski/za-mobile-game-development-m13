import { Game, IPlayerData } from '../states/Game';
import { IItemData, Item } from './Item';

interface IInteraction {
  action?: string;
  asset?: string;
  text?: string;
}

export interface IThingData {
  asset: string;
  destination?: string;
  id?: string;
  isOpen: boolean;
  interactions?: any;
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

    if (this.data.type === 'collectable') {
      this.state.addItem(this.data);
      this.kill();
      return;
    } else if (
      this.data.type === 'door'
      && this.data.destination
      && this.data.isOpen
    ) {
      const playerData: IPlayerData = {
        items: [],
        room: this.data.destination,
      };

      this.state.items.forEachAlive((item: Item) => {
        playerData.items.push(item.data);
      }, this);

      this.game.state.start('Game', true, false, playerData);
      return;
    }

    const selectedItem = this.state.selectedItem;

    if (selectedItem) {
      if (
        this.data.interactions
        && selectedItem.data.id
        && this.data.interactions[selectedItem.data.id]
      ) {
        const interaction: IInteraction = this.data.interactions[selectedItem.data.id];

        if (interaction.text) {
          this.state.panelLabel.text = interaction.text;
        }

        if (interaction.asset) {
          this.loadTexture(interaction.asset);
          this.data.asset = interaction.asset;
        }

        if (interaction.action === 'open-door') {
          this.data.isOpen = true;
          selectedItem.kill();
          this.state.clearSelection();
        }
      }
    }
  }
}
