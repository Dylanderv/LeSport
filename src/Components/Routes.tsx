import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function Routes() {
    const navigate = useNavigate()
    
    return (
        <div>
            <Button onClick={() => navigate("/items")}>items</Button>
            <Button onClick={() => navigate("/items/create")}>create item</Button>
            <Button onClick={() => navigate("/test")}>test</Button>
            <Button onClick={() => navigate("/sections")}>sections</Button>
            <Button onClick={() => navigate("/sections/create")}>create section</Button>
        </div>
    )
}

export default Routes;