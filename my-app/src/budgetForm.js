import {useState} from 'react';
import {Grid2, Button, TextField, FormGroup, FormControlLabel, Checkbox, Box} from '@mui/material';
import groqGen from './groqChat.js'
import { useNavigate } from 'react-router-dom';

const goal_list = [
  "To save for the short term",
  "To save for the long term",
  "To invest more",
  "To track finances",
  "To pay off debt"
]

function BudgetForm() {
  const navigate = useNavigate();

  const [response, setResponse] = useState("");
  const [budget, setBudget] = useState(0);
  const [salary, setSalary] = useState(0);
  const [spending, setSpending] = useState(0);

  const [checkedState, setCheckedState] = useState(
    new Array(goal_list.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var goals = []
    for (let i = 0; i < goal_list.length; ++i) {
      if (checkedState[i] === true){
        goals.push(goal_list[i])
      }
    }

    async function callAsync() {
        var aiResult = await groqGen(budget, salary, spending, goals, response);
        var avatar_response = aiResult.response;
        var budget_breakdown = aiResult.budget_breakdown;
        alert(`ai result: ${avatar_response}`);
        navigate('/FinanceBuddy', {
          state: { avatar_response, budget_breakdown, goals},
        });
    }
    callAsync();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid2
      container
      rowSpacing={2}
      direction='column'
      alignItems="left"
      justifyContent="left"
      sx={{ m: 2, display: 'flex' }}
    >
      <Grid2 item>
        <TextField
          id="outlined-basic"
          label="Montly Salary"
          onChange={(e) => setSalary(e.target.value)}
        />
      </Grid2>
      <Grid2 item>
        <TextField
          id="outlined-basic"
          label="Average Monthly Spending"
          onChange={(e) => setSpending(e.target.value)}
        />
      </Grid2>
      <Grid2>
        <TextField
          id="outlined-basic"
          label="Monthly Budget Goal"
          onChange={(e) => setBudget(e.target.value)}
        />
      </Grid2>
      <Grid2 item>
        <Box>
          <h2>Your Current Goals:</h2>
        </Box>
        <FormGroup>
          {goal_list.map((item, index) => {
            return (
                <FormControlLabel
                  control={<Checkbox onChange={() => handleOnChange(index)} />}
                  label={item}
                />
            );
          })}
        </FormGroup>
      </Grid2>
      <Grid2 item>
        <TextField
          id="outlined-multiline-static"
          label="Your Current Finance Plan"
          multiline
          fullWidth={true}
          rows={4}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="What do you know about finance? What rules do you follow? What financial planning have you done?"
        />
      </Grid2>
      <Grid2 item>
        <Button 
          variant="contained" 
          type="submit"
        >
          Submit
        </Button>
      </Grid2>
    </Grid2>
    </form>
  )
}

export default function BudgetPlan() {
  return (
    <Box sx={{ m: 4 }}>
      <h1>Let us know your finance and budgeting goals!</h1>
      <BudgetForm/>
    </Box>
  );
}