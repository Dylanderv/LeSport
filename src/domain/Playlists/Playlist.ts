import {Section} from "../Sections/Section.ts";

export class Playlist {
    public readonly id: string;
    public readonly name: string;
    public sections: Section[];
    
    constructor(id: string | null, name: string, sections: Section[]) {
        this.id = id === null ? crypto.randomUUID() : id;
        this.name = name;
        this.sections = sections;
    }
    
    static New(name: string, sections: Section[] = []) {
        return new Playlist(null, name, sections);
    }

    Copy() {
        return new Playlist(this.id, this.name, this.sections);
    }
    
    public addSection(section: Section): void {
        this.sections = [...this.sections, section];
    }
}