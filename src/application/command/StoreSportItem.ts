import { UnconfiguredSportItem } from "../../domain/SportItems/UnconfiguredSportItem";
import {AddUnconfiguredSportItem} from "../../infrastructure/storage/firestoreRepo.ts";

export interface StoreUnconfiguredSportItem {
    itemToCreate: UnconfiguredSportItem;
}

export abstract class StoreUnconfiguredSportItemHandler {
    static async handle(command: StoreUnconfiguredSportItem) {
        await AddUnconfiguredSportItem(command.itemToCreate);
    }
}
