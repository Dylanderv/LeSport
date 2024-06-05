import { Named } from "./Marker/Named";
import {ISportItem, SportItem} from "./SportItem";

export class UnconfiguredSportItem extends SportItem implements Named {
    constructor(name: string) {
        super(name);
    }
    ToData(): ISportItem {
        return {...this, type: null, times: null, unconfiguredId: null, time: null, rest: null}
    }
}
