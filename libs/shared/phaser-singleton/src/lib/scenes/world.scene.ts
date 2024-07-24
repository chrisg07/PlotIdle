/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-magic-numbers */
import { Blacksmith, CheapSword, FancySword, Sword } from '@spectacle-development/shared/data-access-model';
import { PhaserSingletonService } from '@spectacle-development/shared-phaser-singleton';
import * as Phaser from 'phaser';

import { ScrollManager } from '../utilities/scroll-manager';

export class WorldScene extends Phaser.Scene {
    private backgroundKey = 'background-image'; // * Store the background image name
    private backgroundImageAsset = 'assets/blacksmith/blacksmith_bg.png'; // * Asset url relative to the app itself
    private backgroundImage: Phaser.GameObjects.Image; // * Reference for the background image
    private blackSmith: Blacksmith; // * We only have a single blacksmith in this game
    private scrollManager: ScrollManager; // * Custom openforge utility for handling scroll
    private triggerTimer: Phaser.Time.TimerEvent;
    public constructedSwords: Sword[] = [];
    public totalResources: number = 0;

    constructor() {
        super({ key: 'preloader' });
    }

    async preload(): Promise<void> {
        try {
            console.log('world.scene.ts', 'Preloading Assets...');

            // * Now load the background image
            this.load.image(this.backgroundKey, this.backgroundImageAsset);
            // * Now preload the sword images, even though we don't use it initially
            this.load.image(FancySword.key, FancySword.imageAsset);
            this.load.image(CheapSword.key, CheapSword.imageAsset);
            // * Load the blacksmith sprites
            await this.preloadBlacksmithCharacter();
        } catch (e) {
            console.error('preloader.scene.ts', 'error preloading', e);
        }
    }

    /**
     * * Load the blacksmith sprites
     */
    preloadBlacksmithCharacter(): void {
        this.load.atlas(Blacksmith.idleKey, Blacksmith.spriteSheet, Blacksmith.atlast);
        this.load.atlas(Blacksmith.hammeringKey, Blacksmith.spriteSheet, Blacksmith.atlast);
        this.load.animation(this.backgroundKey, Blacksmith.animation);
    }

    /**
     * * Phaser will only call create after all assets in Preload have been loaded
     */
    async create(): Promise<void> {
        console.log('world.scene.ts', 'Creating Assets...', this.scale.width, this.scale.height);

        // * Setup the Background Image
        this.backgroundImage = this.add.image(0, 0, this.backgroundKey);

        // * Setup the Blacksmith Character Sprite
        this.blackSmith = await Blacksmith.build(this);
        // * Because the blacksmith is a much smaller scale image than the background image, we need to scale it up.
        this.blackSmith.setScale(3);

        // * Now handle scrolling
        this.cameras.main.setBackgroundColor('0xEBF0F3');

        // * Register our custom scroll manager
        this.scrollManager = new ScrollManager(this);
        this.scrollManager.registerScrollingBackground(this.backgroundImage);
        // * Set cameras to the correct position
        this.cameras.main.setZoom(0.25);
        this.scrollManager.scrollToCenter();

        this.scale.on('resize', this.resize, this);

        this.triggerTimer = this.time.addEvent({
            callback: this.plotCycle,
            callbackScope: this,
            delay: 1000, // 1000 = 1 second
            loop: true,
        });
    }

    public plotCycle(): void {
        console.log('plotCycle start: ');

        for (const plot of PhaserSingletonService.plots) {
            this.totalResources += plot.stats.mineResources();
        }

        console.log('plotCycle end: ', this.totalResources);
        console.table(PhaserSingletonService.plots);
    }

    /**
     * * When the screen is resized, we
     *
     * @param gameSize
     */
    resize(gameSize: Phaser.Structs.Size): void {
        console.log('Resizing', gameSize.width, gameSize.height);
        this.cameras.resize(gameSize.width, gameSize.height);
    }
}
