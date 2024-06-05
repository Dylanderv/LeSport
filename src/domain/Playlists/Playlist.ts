import {Section} from "../Sections/Section.ts";

export class Playlist {
    public readonly id: string;
    public readonly name: string;
    public sections: Section[];
    public restBetweenSections: number | null
    
    constructor(id: string | null, name: string, sections: Section[], restBetweenSections: number | null) {
        this.id = id === null ? crypto.randomUUID() : id;
        this.name = name;
        this.sections = sections;
        this.restBetweenSections = restBetweenSections;
    }
    
    static New(name: string, sections: Section[] = [], restBetweenSections: number | null) {
        return new Playlist(null, name, sections, restBetweenSections);
    }

    Copy() {
        return new Playlist(this.id, this.name, this.sections, this.restBetweenSections);
    }
    
    public addSection(section: Section): void {
        this.sections = [...this.sections, section];
    }
}