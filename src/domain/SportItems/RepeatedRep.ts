import {ISportItem, TypedSportItem} from "./SportItem";
import { Rep } from "./Marker/Rep";
import { Repeated } from "./Marker/Repeated";
import { Named } from "./Marker/Named";
import { SportItemType } from "./SportItemType";


export class RepeatedRep extends TypedSportItem implements Repeated, Rep, Named {
    public readonly times: number;
    public readonly rest: number;
    public readonly rep: number;

    constructor(name: string, times: number, rest: number, rep: number, unconfiguredId: string) {
        super(SportItemType.RepeatedRep, name, unconfiguredId);
        this.times = times;
        this.rest = rest;
        this.rep = rep;
    }

    ToData(): ISportItem {
        return {...this, time: null}
    }
}
