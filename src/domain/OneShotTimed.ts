import { SportItem } from "./SportItem";
import { Timed } from "./Timed";


export class OneShotTimed extends SportItem implements Timed {
    public readonly time: number;

    constructor(name: string, time: number) {
        super("OneShotTimed", name);
        this.time = time;
    }
}
