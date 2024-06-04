import { FormControl, FormLabel, Input, Sheet, Button } from "@mui/joy";
import { useState } from "react";
import Routes from "../Components/Routes";
import { useNavigate } from "react-router-dom";
import {Playlist} from "../domain/Playlists/Playlist.ts";
import {StorePlaylistHandler} from "../application/command/StorePlaylist.ts";

function CreatePlaylist() {
    const [name, setName] = useState<string | null>(null);
    const navigate = useNavigate()

    const onPlaylistCreated = () => {
        const playlist = Playlist.New(name!)
        StorePlaylistHandler.handle({ playlistToCreate: playlist })
        navigate(`/Playlists/${playlist.id}`);
    }

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2}}>
            <Routes></Routes>

            <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input onChange={e => setName(e.target.value)} color="primary" placeholder="Nom..." variant="outlined" />
            </FormControl>
            
            <Button onClick={onPlaylistCreated}>Créer</Button>
        </Sheet>
    )
}
export default CreatePlaylist;