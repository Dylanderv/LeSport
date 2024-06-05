import {Playlist} from "../../domain/Playlists/Playlist.ts";
import {AddPlaylist} from "../../infrastructure/storage/firestoreRepo.ts";

export interface StorePlaylist {
    playlistToCreate: Playlist;
}

export abstract class StorePlaylistHandler {
    static async handle(command: StorePlaylist) {
        await AddPlaylist(command.playlistToCreate);
    }
}
