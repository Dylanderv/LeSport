import { SportItem } from "./SportItem";
import { Rep } from "./Rep";
import { Repeated } from "./Repeated";
import { Named } from "./Named";
import { SportItemType } from "./SportItemType";


export class RepeatedRep extends SportItem implements Repeated, Rep, Named {
    public readonly times: number;
    public readonly rest: number;
    public readonly rep: number;
    public readonly name: string;

    constructor(name: string, times: number, rest: number, rep: number) {
        super(SportItemType.RepeatedRep);
        this.times = times;
        this.rest = rest;
        this.rep = rep;
        this.name = name;
    }
}
