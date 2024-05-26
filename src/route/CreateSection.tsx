import { FormControl, FormLabel, Input, Sheet, Button, IconButton, List, Checkbox } from "@mui/joy";
import { OneShotSection, RepeatedSection } from "../domain/Sections/Section";
import { useState } from "react";
import { StoreSectionHandler } from "../application/command/StoreSection";
import { GetAllUnconfiguredSportItemsHandler } from "../application/Query/GetAllSportItems";
import Routes from "../Components/Routes";
import { UnconfiguredSportItem } from "../domain/SportItems/UnconfiguredSportItem";
import { UnconfiguredSportItemElement } from "../Components/UnconfiguredSportItemElement";
import { useNavigate } from "react-router-dom";

function CreateSection() {
    const [name, setName] = useState<string | null>(null);
    const [selectedSportItems, setSelectedSportItems] = useState<UnconfiguredSportItem[]>([]);
    const [options, setOptions] = useState<RepeatedOptions>({ times: 0, rest: 0});
    const navigate = useNavigate()

    const [isRepeatable, setIsRepeatable] = useState<boolean>(false);
    const sportItems = GetAllUnconfiguredSportItemsHandler.handle({});

    const onSectionCreated = () => {
        const section = isRepeatable
            ? new RepeatedSection(name!, [], selectedSportItems, options.times, options.rest)
            : new OneShotSection(name!, [], selectedSportItems)
        StoreSectionHandler.handle({ sectionToCreate: section })
        navigate(`/sections/${section.id}`);
    }

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2}}>
            <Routes></Routes>

            <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input onChange={e => setName(e.target.value)} color="primary" placeholder="Nom..." variant="outlined" />
            </FormControl>

            <div>
                <Checkbox onChange={() => setIsRepeatable(!isRepeatable)} label="Repetable" />
            </div>

            {isRepeatable
                ? <RepeatedSectionForm onOptionsChanged={setOptions}></RepeatedSectionForm>
                : <span></span>}

            <SelectSportItems onItemSelected={x => setSelectedSportItems(x)} name={name} sportItems={sportItems} />

            <Button onClick={onSectionCreated}>Créer</Button>
        </Sheet>
    )
}

type SelectSportItemsProps = {
    name: string | null,
    onItemSelected: (itemsSelected: UnconfiguredSportItem[]) => void,
    sportItems: UnconfiguredSportItem[]
}

function SelectSportItems(props: SelectSportItemsProps) {
    const [sportItems, setSportItems] = useState<UnconfiguredSportItem[]>([]);

    const addOrRemoveItem = (sportItem: UnconfiguredSportItem) => {
        if (sportItems.find(x => x === sportItem) === undefined) {
            setSportItems([...sportItems, sportItem]);
            props.onItemSelected([...sportItems, sportItem]);
            return;
        }
        setSportItems(sportItems.filter(x => x !== sportItem));
        props.onItemSelected(sportItems.filter(x => x !== sportItem));
    }

    return (
        <List>
            {
                props.sportItems
                    .map(x =>
                        <UnconfiguredSportItemElement
                            key={x.id}
                            item={x}
                            Button={() =>
                                <AddButton onClick={() => addOrRemoveItem(x)} />

                            }
                        >
                        </UnconfiguredSportItemElement>)
            }
        </List>
    )
}

function AddButton(props: { onClick: () => void }) {
    const [isAdded, setIsAdded] = useState<boolean>(false);

    const handleClick = () => {
        setIsAdded(!isAdded)
        props.onClick();
    }

    return (
        <IconButton color="primary" onClick={handleClick}>{isAdded ? "-" : "+"}</IconButton>
    )
}

type RepeatedSectionFormProps = {
    onOptionsChanged: (options: RepeatedOptions) => void
}

type RepeatedOptions = {
    times: number,
    rest: number
}


function RepeatedSectionForm({ onOptionsChanged }: RepeatedSectionFormProps) {
    const [options, setOptions] = useState<RepeatedOptions>({
        times: 0,
        rest: 0
    });

    const handleChange = (key: string, value: any) => {
        setOptions({
            ...options,
            [key]: value
        });
        onOptionsChanged(options)

    }

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            <FormControl>
                <FormLabel>Séries</FormLabel>
                <Input color="primary" type="number" placeholder="Séries..." variant="outlined"
                    name="times" value={options.times} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Repos entre séries (secondes)</FormLabel>
                <Input color="primary" type="number" placeholder="Repos entre séries..." variant="outlined"
                    name="rest" value={options.rest} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                />
            </FormControl>
        </Sheet>
    );
}

export default CreateSection;