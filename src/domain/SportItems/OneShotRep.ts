import { TypedSportItem } from "./SportItem";
import { Rep } from "./Marker/Rep";
import { SportItemType } from "./SportItemType";
import { Named } from "./Marker/Named";


export class OneShotRep extends TypedSportItem implements Rep, Named {
    public readonly rep: number;

    constructor(name: string, rep: number, unconfiguredId: string) {
        super(SportItemType.OneShotRep, name, unconfiguredId);
        this.rep = rep;
    }
}
