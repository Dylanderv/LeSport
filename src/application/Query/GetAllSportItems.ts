import {GetAllUnconfiguredSportItems} from "../../infrastructure/storage/firestoreRepo.ts";

export interface GetAllUnconfiguredSportItems {
}

export abstract class GetAllUnconfiguredSportItemsHandler {
    static async handle(_query: GetAllUnconfiguredSportItems) {
        return await GetAllUnconfiguredSportItems();
    }
}
