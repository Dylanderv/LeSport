import { SectionDb } from "../../infrastructure/storage/InMemoryStorage";

export interface GetItemFromSection {
    sectionId: string | undefined,
    itemId: string | undefined
}

export abstract class GetItemFromSectionHandler {
    static handle(query: GetItemFromSection) {
        if (query.sectionId === undefined || query.itemId === undefined) {
            return null;
        }
        const section = SectionDb.filter(x => x.id === query.sectionId)[0];
        let match = null;
        const unconfItemMatch = section.toConfigure.filter(x => x.id == query.itemId);

        if (unconfItemMatch.length === 1) {
            match = unconfItemMatch[0]
        }
        else {
            const itemsMatch = section.items.filter(x => x.id == query.itemId);
            match = itemsMatch.length === 1 ? itemsMatch[0] : null;
        }

        return match;
    }
}
