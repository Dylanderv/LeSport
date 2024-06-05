import {Named} from "./Marker/Named";
import {SportItemType} from "./SportItemType";
import {Rep} from "./Marker/Rep.ts";
import {Timed} from "./Marker/Timed.ts";
import {Repeated} from "./Marker/Repeated.ts";

export interface ISportItem {
    readonly id: string;
    readonly name: string;
    readonly type: SportItemType | null;
    readonly unconfiguredId: string | null;
    readonly times: number | null;
    readonly rest: number | null;
    readonly time: number | null;
    readonly rep: number | null;
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

    abstract ToData(): ISportItem;
}

export function SportItemBuilder(sportItem: ISportItem): TypedSportItem {
    switch (sportItem.type) {
        case SportItemType.OneShotRep:
            return new OneShotRep(sportItem.name, sportItem.rep!, sportItem.unconfiguredId!);
        case SportItemType.Rest:
            return new Rest(sportItem.time!);
        case SportItemType.RepeatedRep:
            return new RepeatedRep(sportItem.name, sportItem.times!, sportItem.rest!, sportItem.rep!, sportItem.unconfiguredId!);
        case SportItemType.RepeatedTimed:
            return new RepeatedTimed(sportItem.name, sportItem.times!, sportItem.rest!, sportItem.time!, sportItem.unconfiguredId!);
        case SportItemType.OneShotTimed:
            return new OneShotTimed(sportItem.name!, sportItem.time!, sportItem.unconfiguredId!);
        case null:
            throw Error();
        // return new UnconfiguredSportItem(sportItem.name);
    }
}

export class OneShotRep extends TypedSportItem implements Rep, Named {
    public readonly rep: number;

    constructor(name: string, rep: number, unconfiguredId: string) {
        super(SportItemType.OneShotRep, name, unconfiguredId);
        this.rep = rep;
    }

    ToData(): ISportItem {
        return {...this, times: null, rest: null, time: null}
    }
}

export class Rest extends TypedSportItem implements Timed {
    public readonly time: number;

    constructor(time: number) {
        super(SportItemType.Rest, "Repos", "0");
        this.time = time;
    }

    ToData(): ISportItem {
        return {...this, times: null, rest: null}
    }
}

export class OneShotTimed extends TypedSportItem implements Timed, Named {
    public readonly time: number;

    constructor(name: string, time: number, unconfiguredId: string) {
        super(SportItemType.OneShotTimed, name, unconfiguredId);
        this.time = time;
    }

    ToData(): ISportItem {
        return {...this, times: null, rest: null}
    }
}

export class RepeatedRep extends TypedSportItem implements Repeated, Rep, Named {
    public readonly times: number;
    public readonly rest: number;
    public readonly rep: number;

    constructor(name: string, times: number, rest: number, rep: number, unconfiguredId: string) {
        super(SportItemType.RepeatedRep, name, unconfiguredId);
        this.times = times;
        this.rest = rest;
        this.rep = rep;
    }

    ToData(): ISportItem {
        return {...this, time: null}
    }
}

export class RepeatedTimed extends TypedSportItem implements Repeated, Timed, Named {
    public readonly times: number;
    public readonly rest: number;
    public readonly time: number;

    constructor(name: string, times: number, rest: number, time: number, unconfiguredId: string) {
        super(SportItemType.RepeatedTimed, name, unconfiguredId);
        this.times = times;
        this.rest = rest;
        this.time = time;
    }

    ToData(): ISportItem {
        return {...this}
    }
}

export class UnconfiguredSportItem extends SportItem implements Named {
    constructor(name: string) {
        super(name);
    }
    ToData(): ISportItem {
        return {...this, type: null, times: null, unconfiguredId: null, time: null, rest: null}
    }
}
