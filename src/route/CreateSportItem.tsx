import { Select, Sheet, Option, Input, Typography, FormControl, FormLabel } from "@mui/joy";
import { SportItemType } from "../domain/SportItemType";
import { useState } from "react";

function CreateSportItem() {
    const typeList = Object.values(SportItemType)

    const [type, setType] = useState<any>(null);

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
                id="ellipsis-list-demo"
                level="h1"
                justifyContent='center'
                color="primary"
            >
                Créateur d'exercice
            </Typography>

            <FormControl>
                <FormLabel>Type</FormLabel>
                <Select onChange={(event) => setType()} color="primary" placeholder="Type" size="md" variant="outlined">
                    {typeList.map(x => <Option value={x}>{x}</Option>)}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input color="primary" placeholder="Nom..." variant="outlined" />
            </FormControl>

            <span>{JSON.stringify(type)}</span>
            {
                type === SportItemType.RepeatedRep ? <CreateRepeatedRep /> : <None />
            }
        </Sheet>
    )
}

function CreateRepeatedRep() {
    return (
        <span>wsh</span>
    );
}

function None() {
    return ( <span> Selectionner un type pour continuer </span>);
}

export default CreateSportItem;