import { SectionDb } from "../../infrastructure/storage/InMemoryStorage";

export interface GetSection {
    id: string | undefined
}

export abstract class GetSectionHandler {
    static handle(query: GetSection) {
        if (query.id === undefined) {
            return null;
        }
        return SectionDb.filter(x => x.id === query.id)[0];
    }
}
