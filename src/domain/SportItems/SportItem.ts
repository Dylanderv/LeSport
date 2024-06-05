import { Named } from "./Marker/Named";
import { SportItemType } from "./SportItemType";

export interface ISportItem {
    readonly id: string;
    readonly name: string;
    readonly type: SportItemType | null;
    readonly unconfiguredId: string | null;
    readonly times: number | null;
    readonly rest: number | null;
    readonly time: number | null;
}

export abstract class SportItem implements Named {
    public readonly id: string;
    public readonly name: string;

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
    }
    
    abstract ToData(): ISportItem;
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