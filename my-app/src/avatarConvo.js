import { Grid2, Box, Button } from "@mui/material";
import Sprite from "./avatar";

export default function Conversation({ text }) {
    var sents = text.split(".");
    return (
        <Grid2
            container
            display="flex"
            justifyContent="center"
            justifySelf={"center"}
            minHeight="100vh"
            direction="column"
            sx={{width: 256}}
        >
            <Box>
                <Sprite text={sents} />
            </Box>
            <Grid2 item  display="flex" justifyContent="right">
                <Button
                    variant="contained"
                >
                    Next
                </Button>
            </Grid2>
        </Grid2>
    );
}