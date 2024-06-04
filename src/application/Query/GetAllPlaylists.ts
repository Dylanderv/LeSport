import { PlaylistDb } from "../../infrastructure/storage/InMemoryStorage";

export interface GetAllPlaylists {
}

export abstract class GetAllPlaylistsHandler {
    static handle(_query: GetAllPlaylists) {
        return [...PlaylistDb];
    }
}
