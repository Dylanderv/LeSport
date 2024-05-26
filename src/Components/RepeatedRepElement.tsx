import { ReactElement } from "react";
import { RepeatedRep } from "../domain/SportItems/RepeatedRep";
import { Item } from "./Item";

type RepeatedRepElementProps = {
    item: RepeatedRep,
    Button: (() => ReactElement<any>) | null,
    onClick?: () => void
}

export function RepeatedRepElement(props: RepeatedRepElementProps) {
    const body = `${props.item.times} x ${props.item.rep} reps / repos : ${props.item.rest}s`;

    return (
        <Item key={props.item.id} title={props.item.name} body={body} Button={props.Button} onClick={props.onClick}></Item>
    );
}
