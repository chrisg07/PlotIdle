/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-magic-numbers */
import { PhaserSingletonService } from '@spectacle-development/shared-phaser-singleton';

import { PlotStats } from './plot.stats.class';

export class Plot {
    public name: string = 'Plot ' + Math.floor(Math.random() * 1000).toString(); // * If not passed in default to random name
    public stats: PlotStats; // * The Warrior's Stats

    constructor() {}

    /**
     * * Builds respective class asynchronously
     *
     * @param serializedData: Warrior
     * @returns Promise<Warrior>
     */
    public static async build(): Promise<Plot> {
        console.log('plot.class', 'constructor()');
        const tempObject = new Plot();
        try {
            return tempObject;
        } catch (e) {
            console.error('Error creating plot');
        }
    }

    /**
     * * The warrior exercises via pushups, and gains XP
     * Example of a class giving itself a stat bonus
     */
    public async doPushUps() {
        PhaserSingletonService.actionsHistory.push(this.name + ' is doing pushups.  XP Gained');
        // TODO - Warrior increases XP by 1
    }
}
