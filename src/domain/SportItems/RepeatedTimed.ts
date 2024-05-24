import { SportItem } from "./SportItem";
import { Timed } from "./Timed";
import { Repeated } from "./Repeated";
import { SportItemType } from "./SportItemType";
import { Named } from "./Named";


export class RepeatedTimed extends SportItem implements Repeated, Timed, Named {
    public readonly times: number;
    public readonly rest: number;
    public readonly time: number;
    public readonly name: string;

    constructor(name: string, times: number, rest: number, time: number) {
        super(SportItemType.RepeatedTimed);
        this.times = times;
        this.rest = rest;
        this.time = time;
        this.name = name;
    }
}
