import { PlaylistDb } from "../../infrastructure/storage/InMemoryStorage";

export interface GetPlaylist {
    id: string | undefined
}

export abstract class GetPlaylistHandler {
    static handle(query: GetPlaylist) {
        if (query.id === undefined) {
            return null;
        }
        return PlaylistDb.filter(x => x.id === query.id)[0];
    }
}
