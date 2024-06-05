import { GetAllUnconfiguredSportItemsHandler } from "../application/Query/GetAllSportItems";
import Routes from "../Components/Routes";
import { UnconfiguredSportItemElement } from "../Components/UnconfiguredSportItemElement";
import {useEffect, useState} from "react";
import {UnconfiguredSportItem} from "../domain/SportItems/UnconfiguredSportItem.ts";
import Loading from "../Components/Loading.tsx";

function ListCreatedItems() {
    const [ sportItems, setSportItems ] = useState<UnconfiguredSportItem[] | null>(null);

    useEffect(() => {
        let mounted = true;
        GetAllUnconfiguredSportItemsHandler.handle({})
            .then(items => {
                if(mounted) {
                    setSportItems(items)
                }
            })
        return () => {mounted = false};
    }, [])

    return (
        <div>
            <Routes></Routes>


            {sportItems !== null 
                ? sportItems.map(x => <UnconfiguredSportItemElement key={x.id} item={x} Button={null}></UnconfiguredSportItemElement>)
                : <Loading></Loading>
            }
        </div>
    )
}

export default ListCreatedItems;