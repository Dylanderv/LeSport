import { TypedSportItem } from "../SportItems/SportItem";

export abstract class Section {
    public readonly id: string;
    public readonly type: SectionType
    public readonly name: string
    public items: TypedSportItem[]

    constructor(id: string | null, type: SectionType, name: string, items: TypedSportItem[]) {
        this.id = id === null ? crypto.randomUUID() : id;
        this.type = type;
        this.name = name;
        this.items = items;
    }

    set setItems(items: TypedSportItem[]) {
        this.items = items;
    }

    abstract Copy(): Section;

    addOrUpdateItem(item: TypedSportItem) {
        this.items = [...this.items.filter(x => x.unconfiguredId !== item.unconfiguredId), item];
    }
}

export class OneShotSection extends Section {
    constructor(id: string | null, name: string, items: TypedSportItem[]) {
        super(id, SectionType.OneShotSection, name, items);
    }

    static New(name: string, items: TypedSportItem[]) {
        return new OneShotSection(null, name, items);
    }

    Copy() {
        return new OneShotSection(this.id, this.name, this.items);
    }
}

export class RepeatedSection extends Section {
    public readonly times: number;
    public readonly rest: number;

    constructor(id: string | null, name: string, items: TypedSportItem[], times: number, rest: number) {
        super(id, SectionType.RepeatedSection, name, items);
        this.times = times;
        this.rest = rest;
    }


    static New(name: string, items: TypedSportItem[], times: number, rest: number) {
        return new RepeatedSection(null, name, items, times, rest);
    }

    Copy() {
        return new RepeatedSection(this.id, this.name, this.items, this.times, this.rest);
    }
}

export enum SectionType {
    OneShotSection = "OneShotSection",
    RepeatedSection = "RepeatedSection"
}