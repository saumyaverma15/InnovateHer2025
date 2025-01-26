import { Grid2, Box, Button } from "@mui/material";
import Sprite from "./avatar";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Conversation() {
    const location = useLocation();
    const { avatar_response, budget_breakdown, goals } = location.state || {};
    
    var sents = avatar_response

    const [displayText, setText] = useState("Hi, my name is Blobo, and I'll be your finance buddy!");
    
    const handleNext = () => {
        if (sents.length > 0){
            setText(sents.shift());
        }
        else {
            setText("Let me take you to your dashboard!")
        }
      };

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
                <Sprite text={displayText} />
            </Box>
            <Grid2 item  display="flex" justifyContent="right">
                <Button
                    variant="contained"
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Grid2>
        </Grid2>
    );
}