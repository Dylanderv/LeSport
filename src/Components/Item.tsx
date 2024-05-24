import { Button, Dropdown, IconButton, IconButtonProps, ListDivider, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, Sheet, Typography } from "@mui/joy";
import { ComponentType, ReactElement } from "react";

export type ItemProp = {
  title: string,
  body: string,
  Button: (() => ReactElement<any>) | null
}


export function Item(props: ItemProp) {
  return (
    <Sheet>
      <ListItem endAction={
        props.Button !== null ? props.Button() : <span></span>
      }>
        <ListItemButton>
          <ListItemContent>
            <Typography level="title-sm">{props.title}</Typography>
            <Typography level="body-sm" noWrap>{props.body}</Typography>
          </ListItemContent>
        </ListItemButton>
      </ListItem>

      {/* <SectionDropdown></SectionDropdown> */}

    </Sheet>
  );
}
