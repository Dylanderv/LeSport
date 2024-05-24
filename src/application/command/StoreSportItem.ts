import { SportItem } from "../../domain/SportItems/SportItem";
import { AddSportItem } from "../../infrastructure/storage/InMemoryStorage";

export interface StoreSportItem {
    itemToCreate: SportItem;
}

export abstract class StoreSportItemHandler {
    static handle(command: StoreSportItem) {
        AddSportItem(command.itemToCreate);
    }
}
