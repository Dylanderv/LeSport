import { SportItem } from "./SportItem";
import { Rep } from "./Rep";
import { SportItemType } from "./SportItemType";
import { Named } from "./Named";


export class OneShotRep extends SportItem implements Rep, Named {
    public readonly rep: number;
    public readonly name: string;

    constructor(name: string, rep: number) {
        super(SportItemType.OneShotRep);
        this.name = name;
        this.rep = rep;
    }
}
