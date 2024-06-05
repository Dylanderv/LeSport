import {Button, List, MenuList, Sheet, styled} from "@mui/joy";
import { useParams } from "react-router-dom";
import Routes from "../Components/Routes";
import React, {useEffect, useState} from "react";
import { Playlist } from "../domain/Playlists/Playlist";
import {Section} from "../domain/Sections/Section.ts";
import {GetPlaylistHandler} from "../application/Query/GetPlaylist.ts";
import {Popper} from "@mui/base/Popper";
import {ClickAwayListener} from "@mui/base/ClickAwayListener";
import {Item} from "../Components/Item.tsx";
import {GetAllSectionsHandler} from "../application/Query/GetAllSections.ts";
import {UpdatePlaylistHandler} from "../application/command/UpdatePlaylist.ts";
import Loading from "../Components/Loading.tsx";

function ConfigurePlaylist() {
    const { id } = useParams()
    const [playlist, setPlaylist] = useState<Playlist | null>(null)
    const [ sections, setSections ] = useState<Section[] | null>(null);
    
    useEffect(() => {
        async function GetData() {
            setPlaylist(await GetPlaylistHandler.handle({ id }));
            setSections(await GetAllSectionsHandler.handle({}));
        }
        
        if (playlist === null && sections === null)
            GetData();
    }, [])
    
    const onSectionAdded = async (section: Section) => {
        const newPlaylist = playlist!.Copy();
        newPlaylist.addSection(section);
        await UpdatePlaylistHandler.handle({ playlistToUpdate: newPlaylist! });
        setPlaylist(newPlaylist);
    }
    
    return (
        <Sheet>
            <Routes></Routes>

            {sections  === null || playlist === null 
                ? <Loading></Loading>
                : <div>
                    <span>Playlist {id}</span>

                    <div>
                        <AddSection onSectionSelected={onSectionAdded} sections={sections}></AddSection>

                        <ListSections sections={playlist.sections}></ListSections>
                    </div>
                </div> 
            }

                </Sheet>
                )
            }

type ListSportItemsProps = {
    sections: Section[],
}

function ListSections({sections}: ListSportItemsProps) {
    return (
        <List>
            {
                sections
                    .map(x =>
                        <span key={x.id}>{x.name}</span>)
            }
        </List>
    )
}


const Popup = styled(Popper)({
    zIndex: 1000,
});

function AddSection({ sections, onSectionSelected }: { sections: Section[], onSectionSelected: (item: Section) => void }) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (item: Section) => {
        handleClose();
        onSectionSelected(item);
    };

    const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Tab') {
            setOpen(false);
        } else if (event.key === 'Escape') {
            buttonRef.current!.focus();
            setOpen(false);
        }
    };

    return (
        <div>
            <Button ref={buttonRef} color="primary" onClick={() => setOpen(!open)}>
                Ajouter une section
            </Button>
            <Popup open={open} anchorEl={buttonRef.current} disablePortal
                   modifiers={[
                       {
                           name: 'offset',
                           options: {
                               offset: [0, 4],
                           },
                       },
                   ]}
            >
                <ClickAwayListener
                    onClickAway={(event) => {
                        if (event.target !== buttonRef.current) {
                            handleClose();
                        }
                    }}
                >
                    <MenuList variant="outlined" onKeyDown={handleListKeyDown} sx={{ boxShadow: 'md' }}>
                        {sections.map(x => <Item onClick={() => handleClick(x)} key={x.id} title={x.name} body={""} Button={null}></Item>
                        )}
                    </MenuList>
                </ClickAwayListener>
            </Popup>
        </div>
    );
}


export default ConfigurePlaylist;