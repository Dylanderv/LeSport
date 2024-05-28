import { Timed } from "./Marker/Timed";
import { TypedSportItem } from "./SportItem";
import { SportItemType } from "./SportItemType";

export class Rest extends TypedSportItem implements Timed {
    public readonly time: number;

    constructor(time: number) {
        super(SportItemType.Rest, "Repos", "0");
        this.time = time;
    }
}