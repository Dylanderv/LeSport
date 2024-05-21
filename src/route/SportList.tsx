import { Chip, Divider, List, ListItemButton, ListItemContent, Sheet, Typography } from "@mui/joy";

function SportList() {
  return (
    <Sheet sx={{ marginLeft: 1 }}>
      <Typography
        id="ellipsis-list-demo"
        level="h1"
        justifyContent='center'
        color="primary"
      >
        Dos & Abdos
      </Typography>

      <Chip color="primary" size="lg" variant="outlined">Repos entre section : 2 minutes</Chip>


      <Divider>
        Dos
      </Divider>
      {/* <Chip color="primary" size="lg" variant="outlined">Repos : 1 minute</Chip> */}

      <List
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        <Item title="Rowing haltères" body="4 x 10 reps / 20kg / repos : 1min"></Item>
        <Item title="Repos" body="2min"></Item>
        <Item title="Tractions" body="4 x max reps / repos : 1min"></Item>
      </List>

      <Divider>
        Abdos
      </Divider>
      <Chip color="primary" size="lg" variant="outlined">3 fois</Chip>
      <Chip color="primary" size="lg" variant="outlined">Repos: 1 min</Chip>

      <List
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        <Item title="Gainage assis" body="1 min"></Item>
        <Item title="Crunch" body="10 rep"></Item>
      </List>

      <Divider>
        Fin de session
      </Divider>

      <List
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        <Item title="Traction" body="max rep"></Item>
        <Item title="Pompes" body="max rep"></Item>
        <Item title="Gainage" body="3 min"></Item>
      </List>

    </Sheet>
  );
}

type ItemProp = {
  title: string,
  body: string
}

function Item(props: ItemProp) {
  return (
    <div>
      <ListItemButton>
        <ListItemContent>
          <Typography level="title-sm">{props.title}</Typography>
          <Typography level="body-sm" noWrap>{props.body}</Typography>
        </ListItemContent>
      </ListItemButton>
      {/* <Divider orientation="horizontal" /> */}
    </div>
  )
}

export default SportList
