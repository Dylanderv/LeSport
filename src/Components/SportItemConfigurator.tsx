import { Button, Divider, Input, Sheet } from "@mui/joy";
import { useState } from "react";
import Routes from "../Components/Routes";
import { OneShotRep } from "../domain/SportItems/OneShotRep";
import { RepeatedRep } from "../domain/SportItems/RepeatedRep";
import { OneShotTimed } from "../domain/SportItems/OneShotTimed";
import { RepeatedTimed } from "../domain/SportItems/RepeatedTimed";
import { TypedSportItem } from "../domain/SportItems/SportItem";
import { UnconfiguredSportItem } from "../domain/SportItems/UnconfiguredSportItem";

enum SportItemKind {
    Timed,
    Rep
}

type ConfigurationForm = { times: number, repOrTime: number, rest: number }

function SportItemConfigurator({ itemToConfigure, onItemConfigured } : { itemToConfigure: UnconfiguredSportItem, onItemConfigured: (item: TypedSportItem) => void }) {
    const [stage, setStage] = useState<number>(0)
    const [kind, setKind] = useState<SportItemKind | null>(null)
    const [configuredSettings, setConfiguredSettings] = useState<ConfigurationForm>()

    const item = itemToConfigure

    function goToNextStage() {
        setStage(stage + 1);
    }

    function handleKindSelected(newKind: SportItemKind) {
        setKind(newKind);
        goToNextStage();
    }

    function handleConfigurationDone(configuration: ConfigurationForm) {
        setConfiguredSettings(configuration);
        goToNextStage();
    }

    const onValidate = () => {
        let newItem;
        const oldId = item instanceof TypedSportItem ? item.unconfiguredId : item!.id
        switch (kind) {
            case SportItemKind.Rep:
                newItem = configuredSettings?.times === 1
                    ? new OneShotRep(item!.name, configuredSettings.repOrTime, oldId)
                    : new RepeatedRep(item!.name, configuredSettings!.times, configuredSettings!.rest, configuredSettings!.repOrTime, oldId)
                break;
            case SportItemKind.Timed:
                newItem = configuredSettings?.times === 1
                    ? new OneShotTimed(item!.name, configuredSettings.repOrTime, oldId)
                    : new RepeatedTimed(item!.name, configuredSettings!.times, configuredSettings!.rest, configuredSettings!.repOrTime, oldId)
                break;
        }

        onItemConfigured(newItem!);
    }

    return (
        <Sheet>
            {
                stage === 0
                    ? <KindSelector onKindSelected={handleKindSelected}></KindSelector>
                    : stage === 1 && kind === SportItemKind.Rep
                        ? <RepConfigurator onRepConfigured={handleConfigurationDone}></RepConfigurator>
                        : stage === 1 && kind === SportItemKind.Timed
                            ? <TimeConfigurator onTimeConfigured={handleConfigurationDone}></TimeConfigurator>
                            : <Recap onValidate={onValidate} configuredSettings={configuredSettings!}></Recap>
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

function RepConfigurator({ onRepConfigured }: { onRepConfigured: (configuration: ConfigurationForm) => void }) {
    const [formData, setFormData] = useState<ConfigurationForm>({times: 0, repOrTime: 0, rest: 0});
    
    function handleChange(key: string, value: any) {
        setFormData({
            ...formData,
            [key]: isNaN(value) ? 0 : value
        });
    }
    
    function validateForm() {
        onRepConfigured(formData);
    }

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center", marginTop: 10 }}>
            {/* <FormControl>

            </FormControl>  */}

            <Input color="primary" type="number" placeholder="Séries (1 - n)" variant="outlined"
                name="times" value={formData.times} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
            />
            x
            <Input color="primary" type="number" placeholder="Reps (1 - n)" variant="outlined"
                name="repOrTime" value={formData.repOrTime} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
            />

            rep

            <Divider></Divider>
            {/* A desactiver si Séries === 1 */}
            <Input color="primary" type="number" placeholder="Repos (en secondes)" variant="outlined"
                name="rest" value={formData.rest} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
            />

            <Button onClick={validateForm}> -{">"} </Button>
        </Sheet>
    )
}


function TimeConfigurator({ onTimeConfigured }: { onTimeConfigured: (configuration: ConfigurationForm) => void }) {
    const [formData, setFormData] = useState<ConfigurationForm>({times: 0, repOrTime: 0, rest: 0});
    
    function handleChange(key: string, value: any) {
        setFormData({
            ...formData,
            [key]: isNaN(value) ? 0 : value
        });
    }
    
    function validateForm() {
        onTimeConfigured(formData);
    }

    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center", marginTop: 10 }}>
            {/* <FormControl>

            </FormControl>  */}

            <Input color="primary" type="number" placeholder="Séries (1 - n)" variant="outlined"
                name="times" value={formData.times} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
            />
            x
            <Input color="primary" type="number" placeholder="Temps (1 - n)" variant="outlined"
                name="repOrTime" value={formData.repOrTime} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
            />

            secondes

            <Divider></Divider>
            {/* A desactiver si Séries === 1 */}
            <Input color="primary" type="number" placeholder="Repos (en secondes)" variant="outlined"
                name="rest" value={formData.rest} onChange={e => handleChange(e.target.name, Number.parseInt(e.target.value))}
            />

            <Button onClick={validateForm}> -{">"} </Button>
        </Sheet>
    )
}

function Recap({ configuredSettings, onValidate }: { configuredSettings: ConfigurationForm, onValidate: () => void }) {
    return (
        <Sheet>
            <span>recap</span>
            <span> {JSON.stringify(configuredSettings)}  </span>
            <Button onClick={onValidate}>Validate</Button>
        </Sheet>
    )
}


export default SportItemConfigurator;