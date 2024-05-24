import { Section } from "../../domain/Sections/Section";
import { AddSection } from "../../infrastructure/storage/InMemoryStorage";

export interface StoreSection {
    sectionToCreate: Section;
}

export abstract class StoreSectionHandler {
    static handle(command: StoreSection) {
        AddSection(command.sectionToCreate);
    }
}
