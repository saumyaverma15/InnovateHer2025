import {useState} from 'react';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AiForm() {
  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You entered: ${response}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid2
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '50vh'}}
    >
      <TextField
        id="outlined-multiline-static"
        label="Response"
        multiline
        fullWidth={true}
        rows={4}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="What do you know about finance? What tips do you use? What rules do you follow?"
      />
    </Grid2>
      <Button 
        variant="contained" 
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}

export default function AiPlanner() {
  return (
    <div>
      <h1>What do you know about finance?</h1>
      <AiForm/>
    </div>
  );
}