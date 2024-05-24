import { Select, Sheet, Option, Input, Typography, FormControl, FormLabel, Button } from "@mui/joy";
import { SportItemType } from "../domain/SportItems/SportItemType";
import { useState } from "react";
import { RepeatedRep } from "../domain/SportItems/RepeatedRep";
import { SportItem } from "../domain/SportItems/SportItem";
import { StoreSportItemHandler } from "../application/command/StoreSportItem";
import { useNavigate } from "react-router-dom";

function CreateSportItem() {

    const [type, setType] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const navigate = useNavigate();


    function onSportItemCreated(item: SportItem) {
        StoreSportItemHandler.handle({itemToCreate: item})
    }

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button onClick={() => navigate("/list")}>List</Button>
            <Button onClick={() => navigate("/section")}>Section</Button>

            <Typography
                id="ellipsis-list-demo"
                level="h1"
                justifyContent='center'
                color="primary"
            >
                Créateur d'exercice
            </Typography>

            <TypeAndNameSelector 
                onTypeChange={setType}
                onNameChange={setName}
            ></TypeAndNameSelector>

            {type === SportItemType.RepeatedRep 
            ? <CreateRepeatedRep onRepeatedRepCreated={onSportItemCreated} name={name!} /> 
            : <None />}
        </Sheet>
    )
}

type TypeAndNameSelectorProps = {
    onTypeChange: (newValue: string | null) => void,
    onNameChange: (newValue: string | null) => void
};

function TypeAndNameSelector(props: TypeAndNameSelectorProps) {
    const typeList = Object.values(SportItemType)

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

type CreateRepeatedRepProps = {
    name: string,
    onRepeatedRepCreated: (repeatedRep: RepeatedRep) => void
}

function CreateRepeatedRep(props: CreateRepeatedRepProps) {
    const [formData, setFormData] = useState<any>({
        reps: 0,
        times: 0,
        rest: 0
    });

    function handleChange(key: string, value: any) {
        setFormData({
            ...formData,
            [key]: value
        });
    }

    function validateForm() {
        const repeatedRep = new RepeatedRep(props.name, formData.times, formData.rest, formData.reps);
        props.onRepeatedRepCreated(repeatedRep);
    }

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            <FormControl>
                <FormLabel>Reps</FormLabel>
                <Input color="primary" type="number" placeholder="Reps..." variant="outlined"
                    name="reps" value={formData.reps} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Séries</FormLabel>
                <Input color="primary" type="number" placeholder="Séries..." variant="outlined"
                    name="times" value={formData.times} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Repos entre séries (secondes)</FormLabel>
                <Input color="primary" type="number" placeholder="Repos entre séries..." variant="outlined"
                    name="rest" value={formData.rest} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                />
            </FormControl>

            <Button onClick={validateForm}>Créer</Button>

            <span>{JSON.stringify(formData)}</span>
        </Sheet>
    );
}

function None() {
    return (<span> Selectionner un type pour continuer </span>);
}

export default CreateSportItem;