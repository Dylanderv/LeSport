import { SportItem } from "./SportItem";
import { Rep } from "./Rep";


export class OneShotRep extends SportItem implements Rep {
    public readonly rep: number;

    constructor(name: string, rep: number) {
        super("OneShotRep", name);
        this.rep = rep;
    }
}
