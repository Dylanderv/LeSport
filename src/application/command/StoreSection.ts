import { Section } from "../../domain/Sections/Section";
import {AddSection} from "../../infrastructure/storage/firestoreRepo.ts";

export interface StoreSection {
    sectionToCreate: Section;
}

export abstract class StoreSectionHandler {
    static async handle(command: StoreSection) {
        await AddSection(command.sectionToCreate);
    }
}
