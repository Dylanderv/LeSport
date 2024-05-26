import { Section } from "../../domain/Sections/Section";
import { UpdateSection } from "../../infrastructure/storage/InMemoryStorage";

export interface UpdateSection {
    sectionToUpdate: Section
}

export abstract class UpdateSectionHandler {
    static handle(command: UpdateSection) {
        UpdateSection(command.sectionToUpdate);
    }
}
