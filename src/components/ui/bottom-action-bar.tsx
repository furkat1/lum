import React, { FC, useState } from 'react';
import { MaxWidthContainer } from '@/components/layout/max-width-container';
import { Box, Button, Paper, styled } from '@mui/material';
import { Grid } from '@mui/system';

type BottomActionBarProps = {
  isDirty: boolean,
  onSave: () => void,
  reset: () => void,
  loading: boolean,
}
export const BottomActionBar: FC<BottomActionBarProps> = ({loading, isDirty, onSave, reset}) => {

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: "110px", background: "#121212", borderTop: "1px solid #77767680" }}>
      <MaxWidthContainer
        sx={{ width: "100%", height: "100%", p: {xs: 4, lg: 0} }}
      >
        <Grid container justifyContent="flex-end" alignItems="center" sx={{height: "100%"}} spacing={2}>
          {isDirty && (
            <Grid item>
              <StyledDeleteButton disabled={loading} onClick={() => reset()} variant="outlined">Delete</StyledDeleteButton>
            </Grid>
          )}

          <Grid item>
            <StyledUpdateButton disabled={loading} onClick={() => onSave()} variant="contained">Update</StyledUpdateButton>
          </Grid>
        </Grid>
      </MaxWidthContainer>
    </Paper>
  );
}

const StyledUpdateButton = styled( Button )( ({theme }) =>({
  width: '130px',
  height: '42px',
  backgroundColor: '#FF7F92',
  color: '#FFFFFF',
  border: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  [theme.breakpoints.up('md')]: {
    width: '264.85px',
  },
}));

const StyledDeleteButton = styled( Button )( ({theme }) =>({
  width: '130px',
  height: '42px',
  color: '#FFFFFF',
  border: '1px solid #FFFFFF',
  [theme.breakpoints.up('md')]: {
    width: '264.85px',
  },
}));