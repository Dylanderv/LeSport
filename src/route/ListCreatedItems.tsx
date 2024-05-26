import { GetAllUnconfiguredSportItemsHandler } from "../application/Query/GetAllSportItems";
import Routes from "../Components/Routes";
import { UnconfiguredSportItemElement } from "../Components/UnconfiguredSportItemElement";

function ListCreatedItems() {
    const sportItems = GetAllUnconfiguredSportItemsHandler.handle({});

    return (
        <div>
            <Routes></Routes>


            {sportItems.map(x => <UnconfiguredSportItemElement key={x.id} item={x} Button={null}></UnconfiguredSportItemElement>)}
        </div>
    )
}

export default ListCreatedItems;