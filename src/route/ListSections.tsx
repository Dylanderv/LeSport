import { List, ListItem, ListItemButton, ListItemContent, Sheet, Typography } from "@mui/joy";
import { GetAllSectionsHandler } from "../application/Query/GetAllSections";
import Routes from "../Components/Routes";
import { useNavigate } from "react-router-dom";
import { Section } from "../domain/Sections/Section";

function ListSections() {
    const sections = GetAllSectionsHandler.handle({});
    const navigate = useNavigate();

    function goToSection(section: Section) {
        navigate(`/sections/${section.id}`)
    }

    return (
        <Sheet>
            <Routes></Routes>
            <List>
                {sections.map(x =>
                        <ListItem key={x.id}>
                            <ListItemButton onClick={() => goToSection(x)}>
                              <ListItemContent>
                                <Typography level="title-sm">{x.name}</Typography>
                                {/* <Typography level="body-sm" noWrap>{props.body}</Typography> */}
                              </ListItemContent>
                            </ListItemButton>
                          </ListItem>
                )}

            </List>
        </Sheet>
    )
}

export default ListSections