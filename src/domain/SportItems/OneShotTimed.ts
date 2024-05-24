import { Named } from "./Named";
import { SportItem } from "./SportItem";
import { SportItemType } from "./SportItemType";
import { Timed } from "./Timed";

export class OneShotTimed extends SportItem implements Timed, Named {
    public readonly time: number;
    public readonly name: string;

    constructor(name: string, time: number) {
        super(SportItemType.OneShotTimed);
        this.time = time;
        this.name = name;
    }
}
