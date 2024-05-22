import { SportItem } from "../../domain/SportItem";

const SportItemDb: SportItem[] = [];

export function AddSportItem(item: SportItem) {
    SportItemDb.push(item);
}
