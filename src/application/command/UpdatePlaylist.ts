import {Playlist} from "../../domain/Playlists/Playlist.ts";
import {UpdatePlaylist} from "../../infrastructure/storage/firestoreRepo.ts";

export interface UpdatePlaylist {
    playlistToUpdate: Playlist
}

export abstract class UpdatePlaylistHandler {
    static async handle(command: UpdatePlaylist) {
        await UpdatePlaylist(command.playlistToUpdate);
    }
}
