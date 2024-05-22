import { SportItem } from "../../domain/SportItem";
import { AddSportItem } from "../../infrastructure/storage/InMemoryStorage";

export interface StoreSportItem {
    itemToCreate: SportItem;
}

export abstract class StoreSportItemHandler {
    handle(command: StoreSportItem) {
        AddSportItem(command.itemToCreate);
    }
}
