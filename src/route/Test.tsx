import { Button, Sheet } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function Test() {
  const navigate = useNavigate();

  return (
    <Sheet>
      <Button onClick={() => navigate("")}>Wsh</Button>
    </Sheet>
  );
}

export default Test
