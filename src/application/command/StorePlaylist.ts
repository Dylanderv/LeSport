import {AddPlaylist} from "../../infrastructure/storage/InMemoryStorage";
import {Playlist} from "../../domain/Playlists/Playlist.ts";

export interface StorePlaylist {
    playlistToCreate: Playlist;
}

export abstract class StorePlaylistHandler {
    static handle(command: StorePlaylist) {
        AddPlaylist(command.playlistToCreate);
    }
}
