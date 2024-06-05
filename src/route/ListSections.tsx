import {List, ListItem, ListItemButton, ListItemContent, Sheet, Typography} from "@mui/joy";
import {GetAllSectionsHandler} from "../application/Query/GetAllSections";
import Routes from "../Components/Routes";
import {useNavigate} from "react-router-dom";
import {Section} from "../domain/Sections/Section";
import {useEffect, useState} from "react";
import Loading from "../Components/Loading.tsx";

function ListSections() {
    const [sections, setSections] = useState<Section[] | null>(null);

    useEffect(() => {
        async function GetData() {
            setSections(await GetAllSectionsHandler.handle({}));
        }

        if (sections === null)
            GetData();
    }, [])

    const navigate = useNavigate();

    function goToSection(section: Section) {
        navigate(`/sections/${section.id}`)
    }

    return (
        <Sheet>
            <Routes></Routes>
            <List>
                {sections !== null
                    ? sections.map(x =>
                        <ListItem key={x.id}>
                            <ListItemButton onClick={() => goToSection(x)}>
                                <ListItemContent>
                                    <Typography level="title-sm">{x.name}</Typography>
                                    {/* <Typography level="body-sm" noWrap>{props.body}</Typography> */}
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>)
                    : <Loading></Loading>

                }

            </List>
        </Sheet>
    )
}

export default ListSections