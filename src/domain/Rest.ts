import { SportItem } from "./SportItem";
import { Timed } from "./Timed";


export class Rest extends SportItem implements Timed {
    public readonly time: number;

    constructor(name: string, time: number) {
        super("Rest", name);
        this.time = time;
    }
}
