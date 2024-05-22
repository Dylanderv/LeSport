import { SportItem } from "./SportItem";
import { Rep } from "./Rep";
import { Repeated } from "./Repeated";


export class RepeatedRep extends SportItem implements Repeated, Rep {
    public readonly times: number;
    public readonly rest: number;
    public readonly rep: number;

    constructor(name: string, times: number, rest: number, rep: number) {
        super("RepeatedRep", name);
        this.times = times;
        this.rest = rest;
        this.rep = rep;
    }
}
