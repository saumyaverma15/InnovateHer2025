import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const data = [
    {label: 'Food', value: 1000},
    {label: 'Travel', value: 1000 },
    {label: 'Necessitites', value: 1000},
    {label: 'Splurging', value: 1000},
    {label: 'Money Remaining', value: 1000}

]

const expenses = [
    {
      name: 'Food',
      value: 20,
      color: 'hsl(274, 44.90%, 55.90%)',
    },
    {
      name: 'Travel',
      value: 20,
      color: 'hsl(99, 40.70%, 42.40%)',
    },
    {
      name: 'Necessities',
      value: 40,
      color: 'hsl(220, 78.70%, 50.40%)',
    },
    {
      name: 'Splurging',
      value: 20,
      color: 'hsl(307, 48.00%, 51.00%)',
    },
    {
      name: 'Money Remaining',
      value: 20,
      color: 'hsl(44, 78.70%, 50.40%)',
    }
  ];

  const StyledText = styled('text', {
    shouldForwardProp: (prop) => prop !== 'variant',
  })(({ theme }) => ({
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fill: (theme.vars || theme).palette.text.secondary,
    variants: [
      {
        props: {
          variant: 'primary',
        },
        style: {
          fontSize: theme.typography.h5.fontSize,
        },
      },
      {
        props: ({ variant }) => variant !== 'primary',
        style: {
          fontSize: theme.typography.body2.fontSize,
        },
      },
      {
        props: {
          variant: 'primary',
        },
        style: {
          fontWeight: theme.typography.h5.fontWeight,
        },
      },
      {
        props: ({ variant }) => variant !== 'primary',
        style: {
          fontWeight: theme.typography.body2.fontWeight,
        },
      },
    ],
  }));
  
  function PieCenterLabel({ primaryText, secondaryText }) {
    const { width, height, left, top } = useDrawingArea();
    const primaryY = top + height / 2 - 10;
    const secondaryY = primaryY + 24;
  
    return (
      <React.Fragment>
        <StyledText variant="primary" x={left + width / 2} y={primaryY}>
          {primaryText}
        </StyledText>
        <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
          {secondaryText}
        </StyledText>
      </React.Fragment>
    );
  }
  
  PieCenterLabel.propTypes = {
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
  };
  
  const colors = [
    'hsl(286, 49.60%, 48.20%)',
    'hsl(112, 20.00%, 42.20%)',
    'hsl(221, 63.40%, 41.80%)',
    'hsl(301, 55.40%, 56.10%)',
    'hsl(59, 43.10%, 42.70%)',
  ];
  
  export default function ExpensesBudget() {
    return (
      <Card
        variant="outlined"
        sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
      >
        <CardContent>
          <Typography component="h4" variant="subtitle10" sx={{textAlign: "center", fontsize: "200px"}}>
            Spending by Category
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PieChart
              colors={colors}
              margin={{
                left: 80,
                right: 80,
                top: 80,
                bottom: 80,
              }}
              series={[
                {
                  data,
                  innerRadius: 75,
                  outerRadius: 100,
                  paddingAngle: 0,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                },
              ]}
              height={260}
              width={260}
              slotProps={{
                legend: { hidden: true },
              }}
            >
              <PieCenterLabel primaryText="5K" secondaryText="Total" />
            </PieChart>
          </Box>
          {expenses.map((expense, index) => (
            <Stack
              key={index}
              direction="row"
              sx={{ alignItems: 'center', gap: 2, pb: 2 }}
            >
              {expense.flag}
              <Stack sx={{ gap: 1, flexGrow: 1 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>
                    {expense.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {expense.value}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  aria-label="Spending per category"
                  value={expense.value}
                  sx={{
                    [`& .${linearProgressClasses.bar}`]: {
                      backgroundColor: expense.color,
                    },
                  }}
                />
              </Stack>
            </Stack>
          ))}
        </CardContent>
      </Card>
    );
  }