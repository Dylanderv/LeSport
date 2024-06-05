import { Section } from "../../domain/Sections/Section";
import {UpdateSection} from "../../infrastructure/storage/firestoreRepo.ts";

export interface UpdateSection {
    sectionToUpdate: Section
}

export abstract class UpdateSectionHandler {
    static async handle(command: UpdateSection) {
        await UpdateSection(command.sectionToUpdate);
    }
}
