import { FormControl, FormLabel, Input, Sheet, Button, Checkbox } from "@mui/joy";
import { OneShotSection, RepeatedSection } from "../domain/Sections/Section";
import { useState } from "react";
import { StoreSectionHandler } from "../application/command/StoreSection";
import Routes from "../Components/Routes";
import { useNavigate } from "react-router-dom";

function CreateSection() {
    const [name, setName] = useState<string | null>(null);
    const [options, setOptions] = useState<RepeatedOptions>({ times: 0, rest: 0});
    const navigate = useNavigate()

    const [isRepeatable, setIsRepeatable] = useState<boolean>(false);

    const onSectionCreated = () => {
        const section = isRepeatable
            ? RepeatedSection.New(name!, [], options.times, options.rest)
            : OneShotSection.New(name!, [])
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

            <Button onClick={onSectionCreated}>Créer</Button>
        </Sheet>
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