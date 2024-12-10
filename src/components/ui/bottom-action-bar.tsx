import React, { FC, useState } from 'react';
import { MaxWidthContainer } from '@/components/layout/max-width-container';
import { Box, Button, Paper, styled } from '@mui/material';
import { Grid } from '@mui/system';
import { useTranslations } from 'next-intl';
import { palette } from '@/config/palette';

type BottomActionBarProps = {
  isDirty: boolean,
  onReset: (() => void) | ((e: any) => void),
  onSubmit: () => void,
  loading: boolean,
}
export const BottomActionBar: FC<BottomActionBarProps> = ({loading, isDirty, onSubmit, onReset}) => {
  const t = useTranslations("Profile");

  return (
    <StyledPaper>
      <MaxWidthContainer
        sx={{ width: "100%", height: "100%", p: {xs: 4, lg: 0} }}
      >
          <StyledGridContainer container justifyContent="flex-end" alignItems="center" spacing={2}>
            {isDirty && (
              <Grid>
                <StyledDeleteButton disabled={loading} onClick={onReset} variant="outlined">{t('delete')}</StyledDeleteButton>
              </Grid>
            )}
            <Grid>
              <StyledUpdateButton type="submit" disabled={loading || !isDirty} onClick={onSubmit} variant="contained">{t('update')}</StyledUpdateButton>
            </Grid>
          </StyledGridContainer>
      </MaxWidthContainer>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 110px;
  background: #121212;
  border-top: 1px solid #77767680;
`;

const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  height: 100%;
  padding: ${({ theme }) => theme.spacing(4)}px;

  ${({ theme }) => theme.breakpoints.up('lg')} {
    padding: 0;
  }
`;

const StyledGridContainer = styled(Grid)`
  height: 100%;
`;

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
  color: palette.white,
  border: '1px solid #FFFFFF',
  [theme.breakpoints.up('md')]: {
    width: '264.85px',
  },
}));