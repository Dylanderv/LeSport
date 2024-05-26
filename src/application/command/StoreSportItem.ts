import { UnconfiguredSportItem } from "../../domain/SportItems/UnconfiguredSportItem";
import { AddUnconfiguredSportItem } from "../../infrastructure/storage/InMemoryStorage";

export interface StoreUnconfiguredSportItem {
    itemToCreate: UnconfiguredSportItem;
}

export abstract class StoreUnconfiguredSportItemHandler {
    static handle(command: StoreUnconfiguredSportItem) {
        AddUnconfiguredSportItem(command.itemToCreate);
    }
}
