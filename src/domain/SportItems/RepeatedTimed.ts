import {ISportItem, TypedSportItem} from "./SportItem";
import { Timed } from "./Marker/Timed";
import { Repeated } from "./Marker/Repeated";
import { SportItemType } from "./SportItemType";
import { Named } from "./Marker/Named";


export class RepeatedTimed extends TypedSportItem implements Repeated, Timed, Named {
    public readonly times: number;
    public readonly rest: number;
    public readonly time: number;

    constructor(name: string, times: number, rest: number, time: number, unconfiguredId: string) {
        super(SportItemType.RepeatedTimed, name, unconfiguredId);
        this.times = times;
        this.rest = rest;
        this.time = time;
    }

    ToData(): ISportItem {
        return {...this}
    }
}
