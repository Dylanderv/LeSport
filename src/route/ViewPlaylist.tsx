import {Button, Chip, Divider, List, Sheet, Typography} from "@mui/joy";
import {useNavigate, useParams} from "react-router-dom";
import {Item} from "../Components/Item.tsx";
import {GetPlaylistHandler} from "../application/Query/GetPlaylist.ts";
import {Playlist} from "../domain/Playlists/Playlist.ts";

function ViewPlaylist() {
    const { id } = useParams()
    
    const playlist = GetPlaylistHandler.handle({ id });

    
    return (
        <Sheet>
            {playlist === null ? <None/> : <DisplayPlaylist playlist={playlist}/>}
        </Sheet>
    );
}

function DisplayPlaylist({ playlist }: { playlist: Playlist }) {
    const navigate = useNavigate();
    
    const onClickConfigure = () => navigate(`/playlists/${id}/configure`)
    
    
    return (
        <div>
            <Button onClick={onClickConfigure}>Configure</Button>

            <Typography
                id="ellipsis-list-demo"
                level="h1"
                justifyContent='center'
                color="primary"
            >
                {playlist.name}
            </Typography>


            <Chip color="primary" size="lg" variant="outlined">Repos entre section : 2 minutes</Chip>


            <Divider>
                Dos
            </Divider>
            {/* <Chip color="primary" size="lg" variant="outlined">Repos : 1 minute</Chip> */}

            <List
                sx={{ '--ListItemDecorator-size': '56px' }}
            >
                <Item title="Rowing haltères" body="4 x 10 reps / 20kg / repos : 1min" Button={null}></Item>
                <Item title="Repos" body="2min" Button={null}></Item>
                <Item title="Tractions" body="4 x max reps / repos : 1min" Button={null}></Item>
            </List>

            <Divider>
                Abdos
            </Divider>
            <Chip color="primary" size="lg" variant="outlined">3 fois</Chip>
            <Chip color="primary" size="lg" variant="outlined">Repos: 1 min</Chip>

            <List
                sx={{ '--ListItemDecorator-size': '56px' }}
            >
                <Item title="Gainage assis" body="1 min" Button={null}></Item>
                <Item title="Crunch" body="10 rep" Button={null}></Item>
            </List>

            <Divider>
                Fin de session
            </Divider>

            <List
                sx={{ '--ListItemDecorator-size': '56px' }}
            >
                <Item title="Traction" body="max rep" Button={null}></Item>
                <Item title="Pompes" body="max rep" Button={null}></Item>
                <Item title="Gainage" body="3 min" Button={null}></Item>
            </List>
        </div>
    )
}

function None() {
    return (<span>Playlist inconnue</span>)
}

export default ViewPlaylist;