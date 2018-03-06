export class Preload extends Phaser.State {
  public preload() {
    const preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'bar');
    preloadBar.anchor.setTo(0.5);
    preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(preloadBar);

    this.load.image('panel', 'images/blue_panel.png');
    this.load.image('livingroom', 'images/livingroom/livingroom.png');
    this.load.image('armless-chair', 'images/livingroom/armless-chair.png');
    this.load.image('key', 'images/livingroom/key.png');
    this.load.image('lamp', 'images/livingroom/lamp.png');
    this.load.image('tv', 'images/livingroom/tv.png');
    this.load.image('fancy-table', 'images/livingroom/fancy-table.png');
    this.load.image('openDoor', 'images/livingroom/opendoor.png');

    this.load.image('bedroom', 'images/bedroom/bedroom.png');
    this.load.image('medal', 'images/bedroom/flat_medal6.png');
    this.load.image('gem', 'images/bedroom/gem.png');
    this.load.image('chair', 'images/bedroom/wooden-chair-viyana.png');

    this.load.text('livingroom', 'data/livingroom.json');
    this.load.text('bedroom', 'data/bedroom.json');
  }

  public create() {
    this.state.start('Game');
  }
}
