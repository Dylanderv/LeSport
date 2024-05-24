import { ComponentType, ReactElement } from "react";
import { RepeatedRep } from "../domain/SportItems/RepeatedRep";
import { SportItem } from "../domain/SportItems/SportItem";
import { SportItemType } from "../domain/SportItems/SportItemType";
import { RepeatedRepElement } from "./RepeatedRepElement";

type SportItemElementProps = {
    item: SportItem,
    Button: (() => ReactElement<any>) | null
}

export function SportItemElement(props: SportItemElementProps) {
    switch (props.item.type) {
        case SportItemType.RepeatedRep:
            return <RepeatedRepElement item={props.item as RepeatedRep} Button={props.Button}></RepeatedRepElement>;
        case SportItemType.OneShotTimed:
        case SportItemType.RepeatedTimed:
        case SportItemType.OneShotRep:
        case SportItemType.Rest:
            return <span>not supported yet</span>;
    }
}
