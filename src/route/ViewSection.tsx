import { Button, List, MenuList, Sheet, styled } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import Routes from "../Components/Routes";
import { UnconfiguredSportItemElement } from "../Components/UnconfiguredSportItemElement";
import { UnconfiguredSportItem } from "../domain/SportItems/UnconfiguredSportItem";
import { GetSectionHandler } from "../application/Query/GetSection";
import { SportItem, TypedSportItem } from "../domain/SportItems/SportItem";
import { SportItemElement } from "../Components/SportItemElement";
import React, { useState } from "react";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Popper } from '@mui/base/Popper';
import { GetAllUnconfiguredSportItemsHandler } from "../application/Query/GetAllSportItems";
import SportItemConfigurator from "../Components/SportItemConfigurator";
import { UpdateSectionHandler } from "../application/command/UpdateSection";

function ViewSection() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [itemToConfigure, setItemToConfigure] = useState<UnconfiguredSportItem | null>(null);

    const section = GetSectionHandler.handle({ id });
    const sportItems = GetAllUnconfiguredSportItemsHandler.handle({});

    console.log(section);

    const sportItemClicked = (sportItem: UnconfiguredSportItem) => navigate(`items/${sportItem.id}/configurator`)

    const sportItemAdded = (item: UnconfiguredSportItem) => setItemToConfigure(item);
        
    const onItemConfigured = (item: TypedSportItem) => {
        section!.items = [...section!.items, item];
        UpdateSectionHandler.handle({sectionToUpdate: section!});
        setItemToConfigure(null);
    }

    return (
        <Sheet>
            <Routes></Routes>
            <span>yooo {id}</span>

            {itemToConfigure !== null
                ? <SportItemConfigurator itemToConfigure={itemToConfigure} onItemConfigured={onItemConfigured}  ></SportItemConfigurator>
                : <div>
                    <Test onItemSelected={sportItemAdded} sportItems={sportItems}></Test>

                    <Button>Ajouter un exercice</Button>
                    <Button>Ajouter un repos</Button>
                    <ListSportItems onClickSportItem={sportItemClicked} configuredSportItems={section!.items} unconfiguredSportItems={section!.toConfigure}></ListSportItems>

                </div>}

        </Sheet>
    )
}

type ListSportItemsProps = {
    unconfiguredSportItems: UnconfiguredSportItem[],
    configuredSportItems: TypedSportItem[],
    onClickSportItem: (sportItem: UnconfiguredSportItem) => void
}

function ListSportItems({ unconfiguredSportItems, configuredSportItems, onClickSportItem }: ListSportItemsProps) {
    function handleClickItem(sportItem: UnconfiguredSportItem) {
        console.log(sportItem)
        onClickSportItem(sportItem)
    }

    return (
        <List>
            {
                configuredSportItems
                    .map(x =>
                        <SportItemElement
                            key={x.id}
                            item={x}
                            Button={null}
                            onClick={handleClickItem}
                        >
                        </SportItemElement>)
            }
        </List>
    )
}

const Popup = styled(Popper)({
    zIndex: 1000,
});

function Test({ sportItems, onItemSelected }: { sportItems: SportItem[], onItemSelected: (item: UnconfiguredSportItem) => void }) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (item: UnconfiguredSportItem) => {
        onItemSelected(item);
        handleClose();
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
            <Button
                ref={buttonRef}
                id="composition-button"
                aria-controls={'composition-menu'}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                color="neutral"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                Open menu
            </Button>
            <Popup
                role={undefined}
                id="composition-menu"
                open={open}
                anchorEl={buttonRef.current}
                disablePortal
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
                    <MenuList
                        variant="outlined"
                        onKeyDown={handleListKeyDown}
                        sx={{ boxShadow: 'md' }}
                    >
                        {sportItems.map(x => <UnconfiguredSportItemElement item={x} onClickItem={handleClick} Button={null}></UnconfiguredSportItemElement>)}
                    </MenuList>
                </ClickAwayListener>
            </Popup>
        </div>
    );
}

export default ViewSection;