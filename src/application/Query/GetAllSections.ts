import { SectionDb } from "../../infrastructure/storage/InMemoryStorage";

export interface GetAllSections {
}

export abstract class GetAllSectionsHandler {
    static handle(_query: GetAllSections) {
        return [...SectionDb];
    }
}
