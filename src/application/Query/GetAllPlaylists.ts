import {GetAllPlaylists} from "../../infrastructure/storage/firestoreRepo.ts";

export interface GetAllPlaylists {
}

export abstract class GetAllPlaylistsHandler {
    static async handle(_query: GetAllPlaylists) {
        return await GetAllPlaylists();
    }
}
