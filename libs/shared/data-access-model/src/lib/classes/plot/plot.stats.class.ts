/* eslint-disable no-magic-numbers */

/**
 * * This class is a list of typed stats that the warrior has
 */
export class PlotStats {
    public width: number;
    public height: number;
    public resources: number;

    constructor() {
        this.width = this.generateRandomIntegerInRange(2, 5);
        this.height = this.generateRandomIntegerInRange(2, 5);
        this.resources = this.generateRandomIntegerInRange(40, 120);
        console.log('PlotStats', this);
    }

    private generateRandomIntegerInRange(start: number, end: number): number {
        const randInRange = Math.random() * (end - start) + start;
        return Math.ceil(randInRange);
    }
}
