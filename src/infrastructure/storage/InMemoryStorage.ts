import { Section } from "../../domain/Sections/Section";
import { SportItem } from "../../domain/SportItems/SportItem";

export const SportItemDb: SportItem[] = [];
export const SectionDb: Section[] = [];

export function AddSportItem(item: SportItem) {
    console.log(JSON.stringify(item));
    SportItemDb.push(item);
    console.log(SportItemDb)
}


export function AddSection(section: Section) {
    console.log(JSON.stringify(section));
    SectionDb.push(section);
    console.log(SectionDb)
}
