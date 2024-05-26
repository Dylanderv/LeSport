import { Named } from "./Marker/Named";
import { TypedSportItem } from "./SportItem";
import { SportItemType } from "./SportItemType";
import { Timed } from "./Marker/Timed";

export class OneShotTimed extends TypedSportItem implements Timed, Named {
    public readonly time: number;

    constructor(name: string, time: number, unconfiguredId: string) {
        super(SportItemType.OneShotTimed, name, unconfiguredId);
        this.time = time;
    }
}
