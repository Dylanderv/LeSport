import { useNavigate } from "react-router-dom";
import { GetAllSportItemsHandler } from "../application/Query/GetAllSportItems";
import { Button } from "@mui/joy";
import { SportItemElement } from "../Components/SportItemElement";

function ListCreatedItems() {
    const navigate = useNavigate();

    const sportItems = GetAllSportItemsHandler.handle({});

    return (
        <div>
            <Button onClick={() => navigate("/create")}>Create</Button>
            <Button onClick={() => navigate("/section")}>Section</Button>

            {sportItems.map(x => <SportItemElement key={JSON.stringify(x)} item={x} Button={null}></SportItemElement>)}
        </div>
    )
}

export default ListCreatedItems;