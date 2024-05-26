import { TypedSportItem } from "../SportItems/SportItem";
import { UnconfiguredSportItem } from "../SportItems/UnconfiguredSportItem";

export abstract class Section {
    public readonly id: string;
    public readonly type: SectionType
    public readonly name: string
    public items: TypedSportItem[]
    public toConfigure: UnconfiguredSportItem[]

    constructor(type: SectionType, name: string, items: TypedSportItem[], toConfigure: UnconfiguredSportItem[]) {
        this.id = crypto.randomUUID();
        this.type = type;
        this.name = name;
        this.items = items;
        this.toConfigure = toConfigure;
    }

    set setItems(items: TypedSportItem[]) {
        this.items = items;
    }

    configureItem(item: TypedSportItem) {
        this.toConfigure = this.toConfigure.filter(x => x.id !== item.unconfiguredId);
        this.items = [...this.items, item];
    }

    updateItem(item: TypedSportItem) {
        const currentItem = this.items.find(x => x.unconfiguredId === item.unconfiguredId);
        if (currentItem === undefined) {
            const currentToConfigureItem = this.toConfigure.find(x => x.id === item.unconfiguredId);
            if (currentToConfigureItem !== undefined)
            {
                this.configureItem(item)
            } 
            else {
                throw new Error("Unable to find item to update");
            }
        }
        this.items = [...this.items.filter(x => x.unconfiguredId !== item.unconfiguredId), item];
    }
}

export class OneShotSection extends Section {
    constructor(name: string, items: TypedSportItem[], toConfigure: UnconfiguredSportItem[]) {
        super(SectionType.OneShotSection, name, items, toConfigure);
    }
}

export class RepeatedSection extends Section {
    public readonly times: number;
    public readonly rest: number;

    constructor(name: string, items: TypedSportItem[], toConfigure: UnconfiguredSportItem[], times: number, rest: number) {
        super(SectionType.RepeatedSection, name, items, toConfigure);
        this.times = times;
        this.rest = rest;
    }
}

export enum SectionType {
    OneShotSection = "OneShotSection",
    RepeatedSection = "RepeatedSection"
}