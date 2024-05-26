import { UnconfiguredSportItemDb } from "../../infrastructure/storage/InMemoryStorage";

export interface GetAllUnconfiguredSportItems {
}

export abstract class GetAllUnconfiguredSportItemsHandler {
    static handle(_query: GetAllUnconfiguredSportItems) {
        return [...UnconfiguredSportItemDb];
    }
}
