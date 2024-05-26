import { ReactElement } from "react";
import { RepeatedRep } from "../domain/SportItems/RepeatedRep";
import { TypedSportItem } from "../domain/SportItems/SportItem";
import { SportItemType } from "../domain/SportItems/SportItemType";
import { RepeatedRepElement } from "./RepeatedRepElement";

type SportItemElementProps = {
    item: TypedSportItem,
    Button: (() => ReactElement<any>) | null,
    onClick?: (item: TypedSportItem) => void
}

export function SportItemElement(props: SportItemElementProps) {
    function handleClick() {
        if (props.onClick !== null) {
            props.onClick!(props.item);
        }
    }

    switch (props.item.type) {
        case SportItemType.RepeatedRep:
            return <RepeatedRepElement item={props.item as RepeatedRep} Button={props.Button} onClick={handleClick}></RepeatedRepElement>;
        case SportItemType.OneShotTimed:
        case SportItemType.RepeatedTimed:
        case SportItemType.OneShotRep:
        case SportItemType.Rest:
            return <span>not supported yet</span>;
    }
}
