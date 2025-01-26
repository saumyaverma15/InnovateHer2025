import React, { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom"



function Title() {
    return (
        <h1> Personal Information </h1>
    );
}
export {Title};


function PersonalText() {
    const [firstnameValue, setFirstNameValue] = useState("");
    const [lastnameValue, setLastNameValue] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");

    const firstnameValChange = (event) => { 
        setFirstNameValue(event.target.value);
    }

    const lastnameValChange = (event) => { 
        setLastNameValue(event.target.value);
    }

    const ageValChange = (event) => { 
        setAge(event.target.value);
    }

    const occupationValChange = (event) => { 
        setOccupation(event.target.value);
    }

    const themes = {
        container: {
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //padding: "40px",
            gap: "20px",
        },
        label: {
            fontSize: "20px"
    
        },
        input: {
            fontSize: "20px",
            borderRadius: "5px",
            border: "2px solid #234",
            width: "200px"
        },

        };
    

    return (
        <div style = {themes.container}>
            <label style = {themes.label}>Enter your first name:</label>
                <input
                    type = "enter"
                    value = {firstnameValue}
                    onChange = {firstnameValChange}
                    style = {themes.input}
        />
    
        

        <div style = {themes.container}>
            <label style = {themes.label}> Enter your last name:</label>
            <input
                type = "enter"
                value = {lastnameValue}
                onChange = {lastnameValChange}
                style = {themes.input}
                />
        </div>

        <div style = {themes.container}>
            <label style = {themes.label}> Enter your age:</label>
            <input
                type = "enter"
                value = {age}
                onChange = {ageValChange}
                style = {themes.input}
                />
        </div>

        <div style = {themes.container}>
            <label style = {themes.label}> Enter your occupation:</label>
            <input
                type = "enter"
                value = {occupation}
                onChange = {occupationValChange}
                style = {themes.input}
                />
        </div>

        </div>
    );
}

export {PersonalText};




function GoalButtons() {
    const [alignment, setAlignment] = React.useState("");

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
      };

    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      Please choose whether you are planning for a business or personal account
    
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            //labelPosition ="right"
            style={{ display: "flex", justifyContent: "center" }}
            
            >
        <ToggleButton value = "Business">Business</ToggleButton>
        <ToggleButton value = "Personal">Personal</ToggleButton>
        </ToggleButtonGroup>
        </Box>
    );
    }
export {GoalButtons}

function NextButton() {
    return (
        <div
            style={{
                position: "absolute",
                top: "20px",
                right: "20px",


            }}
      >
        <button variant="Next" size="large">
            <Link to="/BudgetForm">Submit</Link>
        </button>
        </div>
    )
}
export {NextButton}

function EnterPersonalInfo() {
    return (
        <div>
            <Title />
            <PersonalText />
            <GoalButtons />
            <NextButton />
        </div>
    );
}

export default EnterPersonalInfo;