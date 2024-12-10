"use client";
import { Box, Divider, FormControl, FormLabel, Skeleton, Stack, styled, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import axios from "axios"

import { palette } from '@/config/palette';
import { Grid } from '@mui/system';
import { PhoneInput } from '@/components/ui/phone-input';
import { Select } from '@/components/ui/select';
import { useSegmentsMetaProvider } from '@/components/providers/segments-meta-provider';
import {
  ExperienceOptions,
  getExperiencePeriodByYear,
  getExperienceYearByPeriod
} from '@/features/profile/helpers/get-experience-number';
import { SessionData } from '@/features/auth/types';
import { BottomActionBar } from '@/components/ui/bottom-action-bar';

type ProfileFormProps = {
  session: SessionData
}
export const ProfileForm: FC<ProfileFormProps> = ({ session }) => {
  const meta = useSegmentsMetaProvider();
  const professionOptions = meta.segmentsMeta?.profession.map(profession => ({ value: profession, label: profession })) || [];
  const positionInClinicOptions = meta.segmentsMeta?.positionInClinic.map(position => ({ value: position, label: position })) || [];
  const experienceOptions = ExperienceOptions.map(exp => ({ value: exp, label: exp }));
  const [isLoading, setIsLoading] = useState(false);

  const nameParts = session.userName ? session.userName.split(" ") : [];
  const initialFirstName = nameParts[0] || "";
  const initialLastName = nameParts[1] || "";
  const initialEmail = session.email || "";
  const initialPhoneNumber = "";
  const initialProfession = session.userProfession || "";
  const initialPositionInClinic = session.userPositionInClinic || "";
  const initialYearStartedAesthetics = session.userYearStartedAesthetics ? getExperiencePeriodByYear(session.userYearStartedAesthetics) : "";

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [profession, setProfession] = useState(initialProfession);
  const [positionInClinic, setPositionInClinic] = useState(initialPositionInClinic);
  const [yearStartedAesthetics, setYearStartedAesthetics] = useState<string>(initialYearStartedAesthetics);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const hasChanged =
      firstName !== initialFirstName ||
      lastName !== initialLastName ||
      email !== initialEmail ||
      phoneNumber !== initialPhoneNumber ||
      profession !== initialProfession ||
      positionInClinic !== initialPositionInClinic ||
      yearStartedAesthetics !== initialYearStartedAesthetics;

    setIsDirty(hasChanged);
  }, [
    firstName,
    lastName,
    email,
    phoneNumber,
    profession,
    positionInClinic,
    yearStartedAesthetics,
  ]);

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await axios.put(`/api/users/${session.userId}`, {
        userProvidedProperties: {
          contactLastName: lastName,
          contactFirstName: firstName,
          profession,
          positionInClinic,
          yearStartedAesthetics: getExperienceYearByPeriod(yearStartedAesthetics as ExperienceOptions),
        },
      });
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFirstName(initialFirstName);
    setLastName(initialLastName);
    setEmail(initialEmail);
    setPhoneNumber(initialPhoneNumber);
    setProfession(initialProfession);
    setPositionInClinic(initialPositionInClinic);
    setYearStartedAesthetics(initialYearStartedAesthetics);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 2, lg: 0 }  }}>
        <Grid container spacing={{xs: 0.5, md:2}}>
          <Grid size={{md: 7, xs: 12}}>
            <Box sx={{ marginTop: "20px", maxWidth: {xs: "100%", md: "752px"} }}>
              <CustomTypography>My profile</CustomTypography>
              <UnderlinedText>Details</UnderlinedText>
              <Box sx={{ marginTop: "33px" }}>
                <form>
                  <FormControl sx={{ marginBottom: '33px', width: '100%' }}>
                    <StyledFormLabel htmlFor='name'>First name</StyledFormLabel>
                    <StyledTextField
                      id='name'
                      type='text'
                      name='name'
                      variant='outlined'
                      color='primary'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} // обработчик onChange
                    />
                  </FormControl>

                  <div>
                    <FormControl sx={{ marginBottom: '33px', width: '100%' }}>
                      <StyledFormLabel htmlFor='lastName'>Last name</StyledFormLabel>
                      <StyledTextField
                        id='lastName'
                        type='text'
                        name='lastName'
                        fullWidth
                        variant='outlined'
                        color='primary'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div>
                    <FormControl sx={{ marginBottom: '33px', width: '100%' }}>
                      <StyledFormLabel htmlFor='email'>Email</StyledFormLabel>
                      <StyledTextField
                        id='email'
                        type='email'
                        name='email'
                        disabled
                        variant='outlined'
                        color='primary'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div>
                    <FormControl sx={{ marginBottom: '33px', width: '100%' }}>
                      <StyledFormLabel htmlFor='phoneNumber'>Phone number</StyledFormLabel>
                      <PhoneInput
                        value={phoneNumber}
                        onChange={(val) => setPhoneNumber(val)}
                        onBlur={() => {}}
                      />
                    </FormControl>
                  </div>

                  <div>
                    <FormControl sx={{ marginBottom: '33px', width: '100%' }}>
                      <StyledFormLabel htmlFor='profession'>Profession</StyledFormLabel>
                      <Select
                        options={professionOptions}
                        sx={{ height: '50px' }}
                        value={profession}
                        onChange={(val) => setProfession(val as string)}
                      />
                    </FormControl>
                  </div>

                  <div>
                    <FormControl sx={{ marginBottom: '33px', width: '100%' }}>
                      <StyledFormLabel htmlFor='positionInClinic'>Position in the clinic</StyledFormLabel>
                      <Select
                        options={positionInClinicOptions}
                        sx={{ height: '50px' }}
                        value={positionInClinic}
                        onChange={(val) => setPositionInClinic(val as string)}
                      />
                    </FormControl>
                  </div>

                  <div>
                    <FormControl sx={{ marginBottom: {xs: 0, md: '143px'}, width: '100%' }}>
                      <StyledFormLabel htmlFor='profession'>Experience in aesthetics</StyledFormLabel>
                      <Select
                        options={experienceOptions}
                        sx={{ height: '50px' }}
                        value={yearStartedAesthetics}
                        onChange={(val) => setYearStartedAesthetics(val as string)}
                      />
                    </FormControl>
                  </div>
                </form>
              </Box>
            </Box>
          </Grid>
          <Grid size={{md: 5, xs: 12}}>
            <Box sx={{ marginTop: {xs: 2, md: 18}, marginBottom: {xs: "143px"}}}>
              <Skeleton variant='rounded' width={325} height={220} sx={{ borderRadius: '5.45px' }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <BottomActionBar loading={isLoading} onSave={handleSubmit}  isDirty={isDirty} reset={handleReset}/>
    </>
  )
};

const StyledFormLabel = styled(FormLabel)(() => ({
  color: palette.white,
  fontSize: 15,
  fontWeight: 400,
  lineHeight: '21px',
  marginBottom: '3px',

  '&::after': {
    position: 'absolute',
    top: '0',
    marginLeft: 2,
  },
}));

const StyledTextField = styled(TextField)(() => ({
  borderRadius: 6,
  background: "#403B3B",
  width: "100%",
  color: palette.white,
  fontSize: 15,
  fontWeight: 400,
  lineHeight: "21px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&.Mui-disabled": {
      "& fieldset": {
        border: "1px solid #FFFFFF40",
      },
      "& input": {
        color: "#a8a7a7",
        background: "#171717",
      },
    },
  },

  input: {
    height: 50,
    boxSizing: "border-box",
    padding: "11px 12px",
  },

  "&.Mui-error": {
    "& .MuiOutlinedInput-root fieldset": {
      border: "1px solid rgba(255, 0, 0, 0.6)",
    },
  },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  fontWeight: 600,
  lineHeight: '36px',
}));

const UnderlinedText = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '28.8px',
  textDecoration: 'underline',
  textDecorationStyle: 'solid',
  textDecorationSkipInk: 'none',
  marginTop: '10px'
}));