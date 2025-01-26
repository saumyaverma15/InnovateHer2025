import { Grid2, Box } from "@mui/material";
import Sprite from "./avatar";

export default function Conversation({ text }) {
    return (
        <Grid2
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Box>
                <Sprite text={text} />
            </Box>
        </Grid2>
    );
}