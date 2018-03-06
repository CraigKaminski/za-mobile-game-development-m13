// tslint:disable:ordered-imports
import 'p2';
import 'pixi';
import 'phaser';
// tslint:enable:ordered-imports

import { Boot } from './states/Boot';
import { Game } from './states/Game';
import { Preload } from './states/Preload';

const game = new Phaser.Game(640, 360, Phaser.AUTO, '', null);
game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('Game', Game);
game.state.start('Boot');
