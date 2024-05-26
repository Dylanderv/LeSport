import { ListItem, ListItemButton, ListItemContent, Typography } from "@mui/joy";
import { ReactElement } from "react";

export type ItemProp = {
  title: string,
  body: string,
  Button?: (() => ReactElement<any>) | null
  onClick?: (() => void) | null
}


export function Item(props: ItemProp) {
  function handleClick() {
    if (props.onClick !== null) {
      props.onClick!();
    }
  }
  return (
      <ListItem endAction={
        props.Button !== null ? props.Button!() : <span></span>
      }>
        <ListItemButton onClick={handleClick}>
          <ListItemContent>
            <Typography level="title-sm">{props.title}</Typography>
            <Typography level="body-sm" noWrap>{props.body}</Typography>
          </ListItemContent>
        </ListItemButton>
      </ListItem>
  );
}
