import { Button, Divider, FormControl, FormLabel, Input, Sheet } from "@mui/joy";
import { useState } from "react";
import {
    OneShotRep,
    OneShotTimed,
    RepeatedRep,
    RepeatedTimed,
    TypedSportItem,
    UnconfiguredSportItem
} from "../domain/SportItems/SportItem";

enum SportItemKind {
    Timed,
    Rep
}

type ConfigurationForm = { times: number, repOrTime: number, rest: number }

function SportItemConfigurator({ itemToConfigure, onItemConfigured }: { itemToConfigure: UnconfiguredSportItem, onItemConfigured: (item: TypedSportItem) => void }) {
    const [stage, setStage] = useState<number>(0)
    const [kind, setKind] = useState<SportItemKind | null>(null)

    const item = itemToConfigure

    function goToNextStage() {
        setStage(stage + 1);
    }

    function handleKindSelected(newKind: SportItemKind) {
        console.log(newKind);
        setKind(newKind);
        goToNextStage();
    }

    function handleConfigurationDone(configuration: ConfigurationForm) {
        let newItem;
        const oldId = item instanceof TypedSportItem ? item.unconfiguredId : item!.id
        switch (kind) {
            case SportItemKind.Rep:
                newItem = configuration?.times === 1
                    ? new OneShotRep(item!.name, configuration.repOrTime, oldId)
                    : new RepeatedRep(item!.name, configuration!.times, configuration!.rest, configuration!.repOrTime, oldId)
                break;
            case SportItemKind.Timed:
                newItem = configuration?.times === 1
                    ? new OneShotTimed(item!.name, configuration.repOrTime, oldId)
                    : new RepeatedTimed(item!.name, configuration!.times, configuration!.rest, configuration!.repOrTime, oldId)
                break;
        }
    
        onItemConfigured(newItem!);
    }

    return (
        <Sheet>
            {
                stage === 0
                    ? <KindSelector onKindSelected={handleKindSelected}></KindSelector>
                    : stage === 1
                        ? <RepOrTimeConfigurator selectedKind={kind!} onRepConfigured={handleConfigurationDone}></RepOrTimeConfigurator>
                        : <span></span>
                        // : <Recap onValidate={onValidate} configuredSettings={configuredSettings!}></Recap>
            }
        </Sheet>
    )
}


function KindSelector({ onKindSelected }: { onKindSelected: (newKind: SportItemKind) => void }) {
    return (
        <Sheet>
            <span>Type d'excercice</span>
            <div>
                <Button onClick={() => onKindSelected(SportItemKind.Rep)}>Repetitions</Button>
            </div>
            <div>
                <Button onClick={() => onKindSelected(SportItemKind.Timed)}>Temps</Button>
            </div>
        </Sheet>
    )
}

function RepOrTimeConfigurator({ onRepConfigured, selectedKind }: { onRepConfigured: (configuration: ConfigurationForm) => void, selectedKind: SportItemKind }) {
    const [formData, setFormData] = useState<ConfigurationForm>({ times: 1, repOrTime: 1, rest: 1 });

    function handleChange(key: string, value: any) {
        setFormData({
            ...formData,
            [key]: isNaN(value) ? 0 : value < 1 ? 1 : value
        });
    }

    function validateForm() {
        onRepConfigured(formData);
    }

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center", marginTop: 10 }}>

            <FormControl>
                <FormLabel>Séries</FormLabel>
                <Input color="primary" type="number" placeholder="Séries (1 - n)" variant="outlined"
                    name="times" value={formData.times} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                />
            </FormControl>
            x
            {
                selectedKind === SportItemKind.Rep
                    ? <FormControl>
                        <FormLabel>Reps</FormLabel>
                        <Input color="primary" type="number" placeholder="Reps (1 - n)" variant="outlined"
                            name="repOrTime" value={formData.repOrTime} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                        />
                    </FormControl>

                    : <FormControl>
                        <FormLabel>Temps (secondes)</FormLabel>
                        <Input color="primary" type="number" placeholder="Temps (1 - n)" variant="outlined"
                            name="repOrTime" value={formData.repOrTime} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                        />
                    </FormControl>

            }

            <Divider></Divider>
            {
                formData.times <= 1
                    ? <span></span>
                    : <FormControl>
                        <FormLabel>Repos entre séries (secondes)</FormLabel>
                        <Input color="primary" type="number" placeholder="Repos (en secondes)" variant="outlined"
                            name="rest" value={formData.rest} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
                        />
                    </FormControl>
            }

            <Button onClick={validateForm}> Enregistrer </Button>
        </Sheet>
    )
}


export default SportItemConfigurator;