import { Section } from "../../domain/Sections/Section";
import { UnconfiguredSportItem } from "../../domain/SportItems/UnconfiguredSportItem";

export let UnconfiguredSportItemDb: UnconfiguredSportItem[] = [
    new UnconfiguredSportItem("Yo")
];
export let SectionDb: Section[] = [];

export function AddUnconfiguredSportItem(item: UnconfiguredSportItem) {
    console.log(JSON.stringify(item));
    UnconfiguredSportItemDb.push(item);
    console.log(UnconfiguredSportItemDb)
}


export function AddSection(section: Section) {
    console.log(JSON.stringify(section));
    SectionDb.push(section);
    console.log(SectionDb)
}

export function UpdateSection(section: Section) {
    console.log(JSON.stringify(section));
    const newDb = SectionDb.filter(x => x.id !== section.id);
    newDb.push(section);
    SectionDb = newDb;
    console.log(SectionDb)
}
