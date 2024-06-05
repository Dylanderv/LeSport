import {List, ListItem, ListItemButton, ListItemContent, Sheet, Typography} from "@mui/joy";
import Routes from "../Components/Routes";
import {useNavigate} from "react-router-dom";
import {Playlist} from "../domain/Playlists/Playlist";
import {GetAllPlaylistsHandler} from "../application/Query/GetAllPlaylists.ts";
import {useEffect, useState} from "react";
import Loading from "../Components/Loading.tsx";

function ListPlaylists() {
    const [playlists, setPlaylists] = useState<Playlist[] | null>(null);

    useEffect(() => {
        async function GetData() {
            setPlaylists(await GetAllPlaylistsHandler.handle({}));
        }

        if (playlists === null)
            GetData();
    }, [])

    const navigate = useNavigate();

    function goToPlaylist(playlist: Playlist) {
        navigate(`/playlists/${playlist.id}`)
    }

    return (
        <Sheet>
            <Routes></Routes>
            <List>
                {playlists !== null
                    ? playlists.map(x =>
                        <ListItem key={x.id}>
                            <ListItemButton onClick={() => goToPlaylist(x)}>
                                <ListItemContent>
                                    <Typography level="title-sm">{x.name}</Typography>
                                    {/* <Typography level="body-sm" noWrap>{props.body}</Typography> */}
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>)
                    : <Loading></Loading>
                }

            </List>
        </Sheet>
    )
}

export default ListPlaylists