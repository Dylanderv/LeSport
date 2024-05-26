import { ReactElement } from "react";
import { RepeatedRep } from "../domain/SportItems/RepeatedRep";
import { TypedSportItem } from "../domain/SportItems/SportItem";
import { SportItemType } from "../domain/SportItems/SportItemType";
import { OneShotRepElement, OneShotTimedElement, RepeatedRepElement, RepeatedTimedElement } from "./RepeatedRepElement";
import { OneShotTimed } from "../domain/SportItems/OneShotTimed";
import { RepeatedTimed } from "../domain/SportItems/RepeatedTimed";
import { OneShotRep } from "../domain/SportItems/OneShotRep";

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
            return <OneShotTimedElement item={props.item as OneShotTimed} Button={props.Button} onClick={handleClick}></OneShotTimedElement>;

        case SportItemType.RepeatedTimed:
            return <RepeatedTimedElement item={props.item as RepeatedTimed} Button={props.Button} onClick={handleClick}></RepeatedTimedElement>;

        case SportItemType.OneShotRep:
            return <OneShotRepElement item={props.item as OneShotRep} Button={props.Button} onClick={handleClick}></OneShotRepElement>;

        case SportItemType.Rest:
            return <span>not supported yet</span>;
    }
}
