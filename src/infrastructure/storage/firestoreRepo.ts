import { collection, doc, setDoc, getDocs, getDoc, CollectionReference } from 'firebase/firestore'
import {UnconfiguredSportItem} from "../../domain/SportItems/UnconfiguredSportItem.ts";
import {ISection, Section, SectionBuilder} from "../../domain/Sections/Section.ts";
import {Playlist, PlaylistBuilder} from "../../domain/Playlists/Playlist.ts";
import {db} from "../firebase/firebase.config.ts";

const UnconfiguredSportItemStore = collection(db, 'UnconfiguredSportItem');
const SectionStore = collection(db, 'Section');
const PlaylistStore = collection(db, 'Playlist');

export async function GetAllUnconfiguredSportItems() {
    console.log("start get all unconf");
    const unconfiguredSportItems = await GetAll<UnconfiguredSportItem>(UnconfiguredSportItemStore);
    console.log("unconf retrieved", unconfiguredSportItems);
    return unconfiguredSportItems
}

export async function GetAllSections() {
    return await GetAll<Section>(SectionStore)
}

export async function GetAllPlaylists() {
    const playlists = await GetAll<Playlist>(PlaylistStore);
    console.log("GetAllPlaylists", playlists)
    return playlists
}

export async function GetPlaylist(id: string) {
    const data = (await getDoc(doc(PlaylistStore, id))).data() as Playlist;
    console.log("GetPlaylist", data)
    
    return PlaylistBuilder(data);
}
export async function GetSection(id: string) {
    const data = (await getDoc(doc(SectionStore, id))).data() as ISection;
    console.log("GetSection", data)
    return SectionBuilder(data);
}

async function GetAll<T>(collection: CollectionReference) {
    const data: T[] = [];
    const querySnapshot = await getDocs(collection);
    querySnapshot.forEach(x => data.push(x.data() as T));
    return data;
}

export async function AddUnconfiguredSportItem(item: UnconfiguredSportItem) {
    await setDoc(doc(UnconfiguredSportItemStore, item.id), item.ToData());
}

export async function AddSection(section: Section) {
    await setDoc(doc(SectionStore, section.id), section.ToData());
}

export async function UpdateSection(section: Section) {
    await setDoc(doc(SectionStore, section.id), section.ToData());
}

export async function AddPlaylist(playlist: Playlist) {
    await setDoc(doc(PlaylistStore, playlist.id), playlist.ToData());
}

export async function UpdatePlaylist(playlist: Playlist) {
    await setDoc(doc(PlaylistStore, playlist.id), playlist.ToData());
}