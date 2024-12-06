import {border, Box, Divider, Icon, List, ListItem, Stack} from "@chakra-ui/react";
import { FaFolderOpen } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import {useRef} from "react";


const Navbar = ({getInput}) => {
    const fileInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const showFile = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                console.log(text);
                getInput(text)
            };
            reader.readAsText(file);
        }
    };

    return(
        <Stack width='5%' alignItems='start' minH='100vh' px={2} py={5}>
            <List spacing={10}>
                <ListItem cursor={'pointer'}>
                    <Stack direction='row' h='8' alignItems={"center"} role={"group"} onClick={handleFileClick}>
                        <Divider orientation='vertical' borderWidth={2.5}
                                 _groupHover={{borderColor: "white", opacity: 1}} borderColor={'unset'}/>
                        <Icon as={FaFolderOpen} w={8} h={8} _groupHover={{color: "white"}}></Icon>
                        <input
                            type="file"
                            ref={fileInputRef} // Asignamos la referencia
                            style={{display: "none"}} // Ocultamos el input
                            onChange={showFile} // Función cuando se selecciona un archivo
                        />
                    </Stack>
                </ListItem>
                <ListItem cursor={'pointer'}>
                    <Stack direction='row' h='8' alignItems={"center"} role={"group"}>
                        <Divider orientation='vertical' borderWidth={2.5} _groupHover={{borderColor: "white", opacity: 1}} borderColor={'unset'}/>
                        <Icon as={FaSave} w={8} h={8} _groupHover={{color: "white"}}></Icon>
                    </Stack>
                </ListItem>
                <ListItem cursor={'pointer'}>
                    <Stack direction='row' h='8' alignItems={"center"} role={"group"}>
                        <Divider orientation='vertical' borderWidth={2.5} _groupHover={{borderColor: "white", opacity: 1}} borderColor={'unset'}/>
                        <Icon as={BiSolidReport} w={8} h={8} _groupHover={{color: "white"}}></Icon>
                    </Stack>
                </ListItem>
                <ListItem cursor={'pointer'}>
                    <Stack direction='row' h='8' alignItems={"center"} role={"group"}>
                        <Divider orientation='vertical' borderWidth={2.5} _groupHover={{borderColor: "white", opacity: 1}} borderColor={'unset'}/>
                        <Icon as={MdReport} w={8} h={8} _groupHover={{color: "white"}}></Icon>
                    </Stack>
                </ListItem>
            </List>
        </Stack>
    )
}

export default Navbar;