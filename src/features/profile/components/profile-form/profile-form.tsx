"use client";
import {
  Accordion,
  AccordionDetails, AccordionSummary,
  Box,
  FormControl,
  FormLabel,
  Skeleton,
  styled,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, useState } from 'react';
import axios from "axios";

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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { refreshSession } from '@/features/profile/helpers/refresh-session';
import { useTranslations } from 'next-intl';

type ProfileFormProps = {
  session: SessionData
}

export const ProfileForm: FC<ProfileFormProps> = ({ session }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const t = useTranslations('Profile')

  const meta = useSegmentsMetaProvider();
  const professionOptions = meta.segmentsMeta?.profession.map(profession => ({ value: profession, label: profession })) || [];
  const positionInClinicOptions = meta.segmentsMeta?.positionInClinic.map(position => ({ value: position, label: position })) || [];
  const experienceOptions = ExperienceOptions.map(exp => ({ value: exp, label: exp }));

  const [isLoading, setIsLoading] = useState(false);

  const initialFirstName = session.userFirstName;
  const initialLastName = session.userLastName;
  const initialEmail = session.email || "";
  const initialPhoneNumber = "";
  const initialProfession = session.userProfession || "";
  const initialPositionInClinic = session.userPositionInClinic || "";
  const initialYearStartedAesthetics = session.userYearStartedAesthetics
    ? getExperiencePeriodByYear(session.userYearStartedAesthetics)
    : "";

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    profession: Yup.string().required('Required'),
    positionInClinic: Yup.string().required('Required'),
    yearStartedAesthetics: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: initialFirstName,
      lastName: initialLastName,
      email: initialEmail,
      phoneNumber: initialPhoneNumber,
      profession: initialProfession,
      positionInClinic: initialPositionInClinic,
      yearStartedAesthetics: initialYearStartedAesthetics,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await axios.put(`/api/users/${session.userId}`, {
          userProvidedProperties: {
            contactLastName: values.lastName,
            contactFirstName: values.firstName,
            profession: values.profession,
            positionInClinic: values.positionInClinic,
            yearStartedAesthetics: getExperienceYearByPeriod(values.yearStartedAesthetics as ExperienceOptions),
          },
        });
        await refreshSession();

        formik.resetForm({
          values: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            profession: values.profession,
            positionInClinic: values.positionInClinic,
            yearStartedAesthetics: values.yearStartedAesthetics,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const formContent = (
    <>
      <Box sx={{ flexGrow: 1, p: { xs: 0, md: 2, lg: 0 } }}>
        <Grid container spacing={{ xs: 0.5, md: 2 }}>
          <Grid size={{ md: 7, xs: 12 }}>
            <Box sx={{ marginTop: isMobile ? "0" : "20px", maxWidth: { xs: "100%", md: "752px" } }}>
              {!isMobile && (
                <>
                  <CustomTypography>{t("myProfile")}</CustomTypography>
                  <UnderlinedText>{t("details")}</UnderlinedText>
                </>
              )}
              <Box sx={{ marginTop: isMobile ? "0" : "33px" }}>
                <form onSubmit={formik.handleSubmit}>
                  <FormControl sx={{ marginBottom: isMobile ? '22px' : '33px', width: '100%' }}>
                    <StyledFormLabel htmlFor='firstName'>First name</StyledFormLabel>
                    <StyledTextField
                      id='firstName'
                      name='firstName'
                      type='text'
                      variant='outlined'
                      color='primary'
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    />
                  </FormControl>

                  <FormControl sx={{ marginBottom: isMobile ? '22px' : '33px', width: '100%' }}>
                    <StyledFormLabel htmlFor='lastName'>Last name</StyledFormLabel>
                    <StyledTextField
                      id='lastName'
                      name='lastName'
                      type='text'
                      fullWidth
                      variant='outlined'
                      color='primary'
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    />
                  </FormControl>

                  <FormControl sx={{ marginBottom: isMobile ? '22px' : '33px', width: '100%' }}>
                    <StyledFormLabel htmlFor='email'>Email</StyledFormLabel>
                    <StyledTextField
                      id='email'
                      name='email'
                      type='email'
                      disabled
                      variant='outlined'
                      color='primary'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </FormControl>

                  <FormControl sx={{ marginBottom: isMobile ? '22px' : '33px', width: '100%' }}>
                    <StyledFormLabel htmlFor='phoneNumber'>Phone number</StyledFormLabel>
                    <PhoneInput
                      id='phoneNumber'
                      name='phoneNumber'
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                    />
                  </FormControl>

                  <FormControl sx={{ marginBottom: isMobile ? '22px' : '33px', width: '100%' }}>
                    <StyledFormLabel htmlFor='profession'>Profession</StyledFormLabel>
                    <Select
                      id='profession'
                      name='profession'
                      options={professionOptions}
                      sx={{ height: '50px' }}
                      value={formik.values.profession}
                      onChange={(val) =>
                        formik.handleChange({ target: { name: 'profession', value: val } } as React.ChangeEvent<HTMLInputElement>)
                      }
                    />
                  </FormControl>

                  <FormControl sx={{ marginBottom: isMobile ? '22px' : '33px', width: '100%' }}>
                    <StyledFormLabel htmlFor='positionInClinic'>Position in the clinic</StyledFormLabel>
                    <Select
                      id='positionInClinic'
                      name='positionInClinic'
                      options={positionInClinicOptions}
                      sx={{ height: '50px' }}
                      value={formik.values.positionInClinic}
                      onChange={(val) =>
                        formik.handleChange({ target: { name: 'positionInClinic', value: val } } as React.ChangeEvent<HTMLInputElement>)
                      }
                    />
                  </FormControl>

                  <FormControl sx={{ marginBottom: { xs: 0, md: '143px' }, width: '100%' }}>
                    <StyledFormLabel htmlFor='yearStartedAesthetics'>Experience in aesthetics</StyledFormLabel>
                    <Select
                      id='yearStartedAesthetics'
                      name='yearStartedAesthetics'
                      options={experienceOptions}
                      sx={{ height: '50px' }}
                      value={formik.values.yearStartedAesthetics}
                      onChange={(val) =>
                        formik.handleChange({ target: { name: 'yearStartedAesthetics', value: val } } as React.ChangeEvent<HTMLInputElement>)
                      }
                    />
                  </FormControl>
                </form>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ md: 5, xs: 12 }}>
            <Box sx={{ marginTop: { xs: 2, md: 18 }, marginBottom: { xs: "143px" } }}>
              <Skeleton variant='rounded' width={325} height={220} sx={{ borderRadius: '5.45px' }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <BottomActionBar
        loading={isLoading}
        onReset={formik.handleReset}
        isDirty={formik.dirty}
        onSubmit={formik.handleSubmit}
      />
    </>
  );

  return (
    <>
      {isMobile ? (
        <Box sx={{p: "5px 7px"}}>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="profile-form-content"
              id="profile-form-header"
            >
              <Typography>{t('myProfile')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {formContent}
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : (
        formContent
      )}
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

const CustomTypography = styled(Typography)(() => ({
  fontSize: '30px',
  fontWeight: 600,
  lineHeight: '36px',
}));

const UnderlinedText = styled(Typography)(() => ({
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '28.8px',
  textDecoration: 'underline',
  textDecorationStyle: 'solid',
  textDecorationSkipInk: 'none',
  marginTop: '10px'
}));