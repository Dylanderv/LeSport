import { List, ListItem, ListItemButton, ListItemContent, Sheet, Typography } from "@mui/joy";
import Routes from "../Components/Routes";
import { useNavigate } from "react-router-dom";
import { Playlist } from "../domain/Playlists/Playlist";
import {GetAllPlaylistsHandler} from "../application/Query/GetAllPlaylists.ts";

function ListPlaylists() {
    const Playlists = GetAllPlaylistsHandler.handle({});
    const navigate = useNavigate();

    function goToPlaylist(playlist: Playlist) {
        navigate(`/playlists/${playlist.id}`)
    }

    return (
        <Sheet>
            <Routes></Routes>
            <List>
                {Playlists.map(x =>
                        <ListItem key={x.id}>
                            <ListItemButton onClick={() => goToPlaylist(x)}>
                              <ListItemContent>
                                <Typography level="title-sm">{x.name}</Typography>
                                {/* <Typography level="body-sm" noWrap>{props.body}</Typography> */}
                              </ListItemContent>
                            </ListItemButton>
                          </ListItem>
                )}

            </List>
        </Sheet>
    )
}

export default ListPlaylists