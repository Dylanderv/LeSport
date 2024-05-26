import { List, Sheet } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import Routes from "../Components/Routes";
import { UnconfiguredSportItemElement } from "../Components/UnconfiguredSportItemElement";
import { UnconfiguredSportItem } from "../domain/SportItems/UnconfiguredSportItem";
import { GetSectionHandler } from "../application/Query/GetSection";
import { TypedSportItem } from "../domain/SportItems/SportItem";
import { SportItemElement } from "../Components/SportItemElement";

function ViewSection() {
    const { id } = useParams()
    const navigate = useNavigate();

    const section = GetSectionHandler.handle({ id });

    console.log(section);

    const sportItemClicked = (sportItem: UnconfiguredSportItem) => navigate(`items/${sportItem.id}/configurator`)

    return (
        <Sheet>
            <Routes></Routes>
            <span>yooo {id}</span>

            <ListSportItems onClickSportItem={sportItemClicked} configuredSportItems={section!.items} unconfiguredSportItems={section!.toConfigure}></ListSportItems>
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
                unconfiguredSportItems
                    .map(x =>
                        <UnconfiguredSportItemElement
                            key={x.id}
                            item={x}
                            Button={null}
                            onClickItem={handleClickItem}
                        >
                        </UnconfiguredSportItemElement>)
            }
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

export default ViewSection;