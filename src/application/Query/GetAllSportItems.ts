import { SportItemDb } from "../../infrastructure/storage/InMemoryStorage";

export interface GetAllSportItems {
}

export abstract class GetAllSportItemsHandler {
    static handle(query: GetAllSportItems) {
        return [...SportItemDb];
    }
}
