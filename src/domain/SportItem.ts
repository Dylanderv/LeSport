import { SportItemType } from "./SportItemType";

export class SportItem {
    public readonly type: SportItemType;

    constructor(type: SportItemType) {
        this.type = type;
    }
}
