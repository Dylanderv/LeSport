import {Playlist} from "../../domain/Playlists/Playlist.ts";
import { UpdatePlaylist } from "../../infrastructure/storage/InMemoryStorage";

export interface UpdatePlaylist {
    playlistToUpdate: Playlist
}

export abstract class UpdatePlaylistHandler {
    static handle(command: UpdatePlaylist) {
        UpdatePlaylist(command.playlistToUpdate);
    }
}
