import { Named } from "./Marker/Named";
import { SportItem } from "./SportItem";

export class UnconfiguredSportItem extends SportItem implements Named {
    constructor(name: string) {
        super(name);
    }
}
