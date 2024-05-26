import { ReactElement } from "react";
import { UnconfiguredSportItem } from "../domain/SportItems/UnconfiguredSportItem";
import { Item } from "./Item";

type UnconfiguredSportItemElement = {
    item: UnconfiguredSportItem,
    Button?: (() => ReactElement<any>) | null,
    onClickItem?: ((item: UnconfiguredSportItem) => void) | null
}

export function UnconfiguredSportItemElement(props: UnconfiguredSportItemElement) {
    function handleClick() {
        if (props.onClickItem !== null) {
            props.onClickItem!(props.item);
        }
    }

    return (
        <Item onClick={handleClick} key={props.item.id} title={props.item.name} body={""} Button={props.Button}></Item>
    )
}
