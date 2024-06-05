import {GetSection} from "../../infrastructure/storage/firestoreRepo.ts";

export interface GetSection {
    id: string | undefined
}

export abstract class GetSectionHandler {
    static async handle(query: GetSection) {
        if (query.id === undefined) {
            return null;
        }
        return await GetSection(query.id);
    }
}
