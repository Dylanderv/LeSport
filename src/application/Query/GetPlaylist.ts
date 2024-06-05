import {GetPlaylist} from "../../infrastructure/storage/firestoreRepo.ts";

export interface GetPlaylist {
    id: string | undefined
}

export abstract class GetPlaylistHandler {
    static async handle(query: GetPlaylist) {
        if (query.id === undefined) 
            return null;
        
        return await GetPlaylist(query.id);
    }
}
