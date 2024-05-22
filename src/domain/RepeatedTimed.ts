import { SportItem } from "./SportItem";
import { Timed } from "./Timed";
import { Repeated } from "./Repeated";


export class RepeatedTimed extends SportItem implements Repeated, Timed {
    public readonly times: number;
    public readonly rest: number;
    public readonly time: number;

    constructor(name: string, times: number, rest: number, time: number) {
        super("RepeatedTimed", name);
        this.times = times;
        this.rest = rest;
        this.time = time;
    }
}
