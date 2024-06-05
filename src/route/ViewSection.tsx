import {Button, FormControl, FormLabel, Input, List, MenuList, Sheet, styled} from "@mui/joy";
import {useParams} from "react-router-dom";
import Routes from "../Components/Routes";
import {UnconfiguredSportItemElement} from "../Components/UnconfiguredSportItemElement";
import {UnconfiguredSportItem} from "../domain/SportItems/UnconfiguredSportItem";
import {GetSectionHandler} from "../application/Query/GetSection";
import {SportItem, TypedSportItem} from "../domain/SportItems/SportItem";
import {SportItemElement} from "../Components/SportItemElement";
import React, {useEffect, useState} from "react";
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import {Popper} from '@mui/base/Popper';
import {GetAllUnconfiguredSportItemsHandler} from "../application/Query/GetAllSportItems";
import SportItemConfigurator from "../Components/SportItemConfigurator";
import {UpdateSectionHandler} from "../application/command/UpdateSection";
import {Rest} from "../domain/SportItems/Rest";
import {Section} from "../domain/Sections/Section";
import Loading from "../Components/Loading.tsx";

function ViewSection() {
    const {id} = useParams()
    const [itemToConfigure, setItemToConfigure] = useState<UnconfiguredSportItem | null>(null);
    const [section, setSection] = useState<Section | null>(null)
    const [sportItems, setSportItems] = useState<UnconfiguredSportItem[] | null>(null);

    useEffect(() => {
        async function GetData() {
            setSportItems(await GetAllUnconfiguredSportItemsHandler.handle({}));
            setSection(await GetSectionHandler.handle({id}));
        }

        if (sportItems === null && section === null)
            GetData();
    }, [])

    const sportItemAdded = (item: UnconfiguredSportItem) => {
        console.log("configure")
        setItemToConfigure(item);
    }

    const onItemConfigured = async (item: TypedSportItem) => {
        const newSection = section!.Copy();
        newSection.items = [...newSection.items, item];
        setSection(newSection)
        await UpdateSectionHandler.handle({sectionToUpdate: newSection!});
        setItemToConfigure(null);
    }

    return (
        <Sheet>
            <Routes></Routes>
            <span>Section {id}</span>

            {sportItems === null || section === null
                ? <Loading></Loading>
                : <div>
                    {itemToConfigure !== null
                        ? <SportItemConfigurator itemToConfigure={itemToConfigure}
                                                 onItemConfigured={onItemConfigured}></SportItemConfigurator>
                        : <div>
                            <AddSportItem onItemSelected={sportItemAdded} sportItems={sportItems}></AddSportItem>
                            <AddRest onRestCreated={onItemConfigured}></AddRest>

                            <ListSportItems configuredSportItems={section.items}></ListSportItems>

                        </div>}
                </div>
            }


        </Sheet>
    )
}

type ListSportItemsProps = {
    configuredSportItems: TypedSportItem[],
}

function ListSportItems({configuredSportItems}: ListSportItemsProps) {
    return (
        <List>
            {
                configuredSportItems
                    .map(x =>
                        <SportItemElement
                            key={x.id}
                            item={x}
                            Button={null}
                        >
                        </SportItemElement>)
            }
        </List>
    )
}

const Popup = styled(Popper)({
    zIndex: 1000,
});

function AddSportItem({sportItems, onItemSelected}: {
    sportItems: SportItem[],
    onItemSelected: (item: UnconfiguredSportItem) => void
}) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (item: UnconfiguredSportItem) => {
        handleClose();
        onItemSelected(item);
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
                Ajouter un exercice
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
                    <MenuList variant="outlined" onKeyDown={handleListKeyDown} sx={{boxShadow: 'md'}}>
                        {sportItems.map(x => <UnconfiguredSportItemElement key={x.id} item={x} onClickItem={handleClick}
                                                                           Button={null}></UnconfiguredSportItemElement>)}
                    </MenuList>
                </ClickAwayListener>
            </Popup>
        </div>
    );
}


function AddRest({onRestCreated}: { onRestCreated: (item: Rest) => void }) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [rest, setRest] = useState<number>(0);

    const handleClose = () => {
        setOpen(false);
    };

    const addRest = () => {
        onRestCreated(new Rest(rest));
        handleClose();
    };

    const onRestChange = (newValue: string) => setRest(Number.parseInt(newValue))

    return (
        <div>
            <Button ref={buttonRef} color="primary" onClick={() => setOpen(!open)}>
                Ajouter un repos
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
                   sx={{
                       background: "black"
                   }}
            >
                <ClickAwayListener
                    onClickAway={(event) => {
                        if (event.target !== buttonRef.current) {
                            handleClose();
                        }
                    }}
                >
                    <div>
                        <FormControl>
                            <FormLabel>Temps</FormLabel>
                            <Input onChange={e => onRestChange(e.target.value)} color="primary" placeholder="Temps..."
                                   variant="outlined"/>
                        </FormControl>
                        <Button onClick={addRest}>Valider</Button>
                    </div>
                </ClickAwayListener>
            </Popup>
        </div>
    );
}

export default ViewSection;