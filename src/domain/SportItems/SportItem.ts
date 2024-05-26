import { Named } from "./Marker/Named";
import { SportItemType } from "./SportItemType";

export abstract class SportItem implements Named {
    public readonly id: string;
    public readonly name: string;

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
    }
}

export abstract class TypedSportItem extends SportItem {
    public readonly type: SportItemType;
    public readonly unconfiguredId: string;

    constructor(type: SportItemType, name: string, unconfiguredId: string) {
        super(name)
        this.type = type;
        this.unconfiguredId = unconfiguredId;
    }
}