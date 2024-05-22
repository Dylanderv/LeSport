import { SportItemType } from "./SportItemType";

export abstract class SportItem {
    public readonly type: SportItemType;
    public name: string;

    constructor(type: SportItemType, name: string) {
        this.type = type;
        this.name = name;
    }
}

