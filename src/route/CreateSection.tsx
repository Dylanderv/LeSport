import { FormControl, FormLabel, Input, Select, Sheet, Option, Button, IconButton, List } from "@mui/joy";
import { OneShotSection, Section, SectionType } from "../domain/Sections/Section";
import { useState } from "react";
import { StoreSectionHandler } from "../application/command/StoreSection";
import { useNavigate } from "react-router-dom";
import { SportItem } from "../domain/SportItems/SportItem";
import { SportItemElement } from "../Components/SportItemElement";
import { GetAllSportItemsHandler } from "../application/Query/GetAllSportItems";

function CreateSection() {
    const [type, setType] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const navigate = useNavigate();

    const sportItems = GetAllSportItemsHandler.handle({});

    function onSectionCreated(section: Section) {
        StoreSectionHandler.handle({ sectionToCreate: section })
    }

    return (
        <div>
            <Button onClick={() => navigate("/create")}>create</Button>
            <Button onClick={() => navigate("/list")}>list</Button>

            <TypeAndNameSelector
                onTypeChange={setType}
                onNameChange={setName}
            ></TypeAndNameSelector>

            {type === SectionType.OneShotSection
                ? <CreateOneShotSection onSectionCreated={onSectionCreated} name={name} sportItems={sportItems} />
                : <None />}
        </div>
    )
}

type TypeAndNameSelectorProps = {
    onTypeChange: (newValue: string | null) => void,
    onNameChange: (newValue: string | null) => void
};

function TypeAndNameSelector(props: TypeAndNameSelectorProps) {
    const typeList = Object.values(SectionType)

    return (
        <div>

            <FormControl>
                <FormLabel>Type</FormLabel>
                <Select onChange={(_, v: string | null) => props.onTypeChange(v)} color="primary" placeholder="Type" size="md" variant="outlined">
                    {typeList.map(x => <Option key={x} value={x}>{x}</Option>)}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input onChange={e => props.onNameChange(e.target.value)} color="primary" placeholder="Nom..." variant="outlined" />
            </FormControl>
        </div>
    )
}

type CreateOneShotSectionProps = {
    name: string | null,
    onSectionCreated: (section: Section) => void,
    sportItems: SportItem[]
}

function CreateOneShotSection(props: CreateOneShotSectionProps) {
    const [sportItems, setSportItems] = useState<SportItem[]>([]);

    function validateForm() {
        const section = new OneShotSection(props.name!, sportItems);
        props.onSectionCreated(section);
    }

    function addOrRemoveItem(sportItem: SportItem) {
        if (sportItems.find(x => x === sportItem) === undefined) {
            setSportItems([...sportItems, sportItem]);
            return;
        }
        setSportItems(sportItems.filter(x => x !== sportItem));
    }
    

    return (
        <List>
            {
                props.sportItems
                    .map(x => 
                        <SportItemElement 
                            key={JSON.stringify(x)} 
                            item={x} 
                            Button={() =>
                                 <AddButton onClick={() => addOrRemoveItem(x)}/>
                                
                            } 
                        >
                        </SportItemElement>)
            }


            <Button onClick={validateForm}>Créer</Button>
        </List>
    )
}

function AddButton(props: { onClick: () => void }) {
    const [isAdded, setIsAdded] = useState<boolean>(false);

    function handleClick() {
        setIsAdded(!isAdded)
        props.onClick();
    }

    return (
        // < size="sm" color="primary">
        //                             wsh
        //                         </IconButton>
        <IconButton color="primary" onClick={handleClick}>{isAdded ? "-" : "+"}</IconButton>
    )
}

function None() {
    return (
        <span>Selectionner un type</span>
    )
}

export default CreateSection;