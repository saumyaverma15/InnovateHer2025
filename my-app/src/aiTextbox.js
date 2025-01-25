import {useState, useEffect} from 'react';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import groqGen from './groqChat.js'

function AiForm() {
  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You entered: ${response}`);
    var budget = 1000;
    var salary = 5000;
    var spending = 3000;
    var goals = ["to save more money", "to invest more"];

    async function callAsync() {
        var aiResult = await groqGen(budget, salary, spending, goals, response);
        var avatar_response = aiResult.response;
        var budget_breakdown = aiResult.budget_breakdown;
        alert(`AI budget_breakdown: ${budget_breakdown.food}`);
    }
    callAsync();
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
      <h1>Let us know your finance and budgeting goals!</h1>
      <AiForm/>
    </div>
  );
}


var budget = 1000
var salary = 5000
var spending = 3000
var goals = ["to save more money", "to invest more"]

groqGen(budget, salary, spending, goals);