import { SectionDb } from "../../infrastructure/storage/InMemoryStorage";

export interface GetAllSections {
}

export abstract class GetAllSectionsHandler {
    static handle(query: GetAllSections) {
        return [...SectionDb];
    }
}
