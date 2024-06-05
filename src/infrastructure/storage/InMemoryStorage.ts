import {OneShotSection, RepeatedSection, Section} from "../../domain/Sections/Section";
import { UnconfiguredSportItem } from "../../domain/SportItems/UnconfiguredSportItem";
import {Playlist} from "../../domain/Playlists/Playlist.ts";
import {OneShotRep} from "../../domain/SportItems/OneShotRep.ts";
import {RepeatedTimed} from "../../domain/SportItems/RepeatedTimed.ts";
import {RepeatedRep} from "../../domain/SportItems/RepeatedRep.ts";
import {OneShotTimed} from "../../domain/SportItems/OneShotTimed.ts";

export let UnconfiguredSportItemDb: UnconfiguredSportItem[] = [
    new UnconfiguredSportItem("Gainage"),
    new UnconfiguredSportItem("Crunch (pas les céréales)"),
    new UnconfiguredSportItem("KitKat (bon la ouais c'est le gateau)"),
];
export let SectionDb: Section[] = [
    new OneShotSection("1", "Séance de fou", [
        new OneShotRep("Tractions", 10, "1"),
        new RepeatedTimed("Gainage", 3, 30, 30, "2"),
        new RepeatedRep("Pompes", 3, 60, 20, "3"),
        new OneShotTimed("Gainage final", 180, "4")
    ]),
    new RepeatedSection("2", "Fin de séance", [
        new OneShotRep("Tractions", 10, "1"),
        new RepeatedTimed("Gainage", 3, 30, 30, "2"),
        new RepeatedRep("Pompes", 3, 60, 20, "3"),
        new OneShotTimed("Gainage final", 180, "4")
    ], 5, 60),
    new OneShotSection("3", "Wsh bieng ou quoi", [
        new OneShotRep("Tractions", 10, "1"),
        new RepeatedTimed("Gainage", 3, 30, 30, "2"),
        new RepeatedRep("Pompes", 3, 60, 20, "3"),
        new OneShotTimed("Gainage final", 180, "4")
    ])
];
export let PlaylistDb: Playlist[] = [
    new Playlist("1", "Wsh", [...SectionDb], 60)
];

export function AddUnconfiguredSportItem(item: UnconfiguredSportItem) {
    console.log(JSON.stringify(item));
    UnconfiguredSportItemDb.push(item);
    console.log(UnconfiguredSportItemDb)
}


export function AddSection(section: Section) {
    console.log(JSON.stringify(section));
    SectionDb.push(section);
    console.log(SectionDb)
}

export function UpdateSection(section: Section) {
    console.log(JSON.stringify(section));
    const newDb = SectionDb.filter(x => x.id !== section.id);
    newDb.push(section);
    SectionDb = newDb;
    console.log(SectionDb)
}

export function AddPlaylist(playlist: Playlist) {
    console.log(JSON.stringify(playlist));
    PlaylistDb.push(playlist);
    console.log(PlaylistDb)
}

export function UpdatePlaylist(playlist: Playlist) {
    console.log(JSON.stringify(playlist));
    const newDb = PlaylistDb.filter(x => x.id !== playlist.id);
    newDb.push(playlist);
    PlaylistDb = newDb;
    console.log(PlaylistDb)
}