import { SportItem } from "../SportItems/SportItem";

export abstract class Section {
    type: SectionType
    name: string
    items: SportItem[]

    constructor(type: SectionType, name: string, items: SportItem[]) {
        this.type = type;
        this.name = name;
        this.items = items;
    }
}

export class OneShotSection extends Section {
    constructor(name: string, items: SportItem[]) {
        super(SectionType.OneShotSection, name, items);
    }
}

export enum SectionType {
    OneShotSection = "OneShotSection"
}