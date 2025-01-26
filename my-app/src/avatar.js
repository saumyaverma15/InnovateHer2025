import { Box, Card, Typography, Avatar } from '@mui/material';
import avatar from "./media/avatar1.png"

function Sprite({text}) {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Card sx={{ padding: 4, width: 256, marginBottom: 4, boxShadow: 3 }}>
          <Typography variant="h6" color="textSecondary">
            Blobo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </Card>
        <Avatar
          alt="Sprite"
          src={avatar}
          sx={{ width: 130, height: 130, boxShadow: 3 }}
        />
      </Box>
    </>
  );
}

export default Sprite;