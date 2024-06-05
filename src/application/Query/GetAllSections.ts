import {GetAllSections} from "../../infrastructure/storage/firestoreRepo.ts";

export interface GetAllSections {
}

export abstract class GetAllSectionsHandler {
    static async handle(_query: GetAllSections) {
        return await GetAllSections();
    }
}
