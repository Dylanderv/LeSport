import { ReactElement } from "react";
import { RepeatedRep } from "../domain/SportItems/RepeatedRep";
import { Item } from "./Item";
import { OneShotRep } from "../domain/SportItems/OneShotRep";
import { OneShotTimed } from "../domain/SportItems/OneShotTimed";
import { RepeatedTimed } from "../domain/SportItems/RepeatedTimed";

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


export function OneShotRepElement(props: {
    item: OneShotRep,
    Button: (() => ReactElement<any>) | null,
    onClick?: () => void
}) {
    const body = `$${props.item.rep} reps`;

    return (
        <Item key={props.item.id} title={props.item.name} body={body} Button={props.Button} onClick={props.onClick}></Item>
    );
}


export function OneShotTimedElement(props: {
    item: OneShotTimed,
    Button: (() => ReactElement<any>) | null,
    onClick?: () => void
}) {
    const body = `${props.item.time}s`;

    return (
        <Item key={props.item.id} title={props.item.name} body={body} Button={props.Button} onClick={props.onClick}></Item>
    );
}


export function RepeatedTimedElement(props: {
    item: RepeatedTimed,
    Button: (() => ReactElement<any>) | null,
    onClick?: () => void
}) {
    const body = `${props.item.times} x ${props.item.time}s / Repos: ${props.item.rest}s`;

    return (
        <Item key={props.item.id} title={props.item.name} body={body} Button={props.Button} onClick={props.onClick}></Item>
    );
}
