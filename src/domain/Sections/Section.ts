import { TypedSportItem } from "../SportItems/SportItem";

export abstract class Section {
    public readonly id: string;
    public readonly type: SectionType
    public readonly name: string
    public items: TypedSportItem[]

    constructor(type: SectionType, name: string, items: TypedSportItem[]) {
        this.id = crypto.randomUUID();
        this.type = type;
        this.name = name;
        this.items = items;
    }

    set setItems(items: TypedSportItem[]) {
        this.items = items;
    }

    addOrUpdateItem(item: TypedSportItem) {
        this.items = [...this.items.filter(x => x.unconfiguredId !== item.unconfiguredId), item];
    }
}

export class OneShotSection extends Section {
    constructor(name: string, items: TypedSportItem[]) {
        super(SectionType.OneShotSection, name, items);
    }
}

export class RepeatedSection extends Section {
    public readonly times: number;
    public readonly rest: number;

    constructor(name: string, items: TypedSportItem[], times: number, rest: number) {
        super(SectionType.RepeatedSection, name, items);
        this.times = times;
        this.rest = rest;
    }
}

export enum SectionType {
    OneShotSection = "OneShotSection",
    RepeatedSection = "RepeatedSection"
}