import {Button, Chip, Divider, List, Sheet, Typography} from "@mui/joy";
import {useNavigate, useParams} from "react-router-dom";
import {GetPlaylistHandler} from "../application/Query/GetPlaylist.ts";
import {Playlist} from "../domain/Playlists/Playlist.ts";
import {RepeatedSection, Section} from "../domain/Sections/Section.ts";
import {SportItemElement} from "../Components/SportItemElement.tsx";

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
    
    const onClickConfigure = () => navigate(`/playlists/${playlist.id}/configure`)
    
    
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


            <Chip color="primary" size="lg" variant="outlined">Repos entre section : {playlist.restBetweenSections}s</Chip>

            {playlist.sections.map(x => 
                <DisplaySection key={x.id} section={x}></DisplaySection>
            )}
        </div>
    )
}

function DisplaySection({ section }: { section: Section }) {
    return (
        <Sheet>
            <Divider>
                {section.name}
            </Divider>
            {section instanceof RepeatedSection && (section as RepeatedSection) !== null
                ? <div>
                    <Chip color="primary" size="lg" variant="outlined">{section.times} fois</Chip>
                    <Chip color="primary" size="lg" variant="outlined">Repos: {section.rest}s</Chip>
                </div>
                : <span></span>
            }   
            
            <List>
                {section.items.map(x => 
                <SportItemElement key={x.id} item={x} Button={null}></SportItemElement>
                    )}
            </List>
        </Sheet>
    )
}

function None() {
    return (<span>Playlist inconnue</span>)
}

export default ViewPlaylist;