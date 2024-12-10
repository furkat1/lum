import 'react-international-phone/style.css';
import {
  BaseTextFieldProps,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Select, styled, SelectProps
} from '@mui/material';
import React from 'react';
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import { KeyboardArrowDownRounded } from '@mui/icons-material';

export interface MUIPhoneProps extends BaseTextFieldProps {
  value: string;
  onChange: (phone: string) => void;
}

export const PhoneInput: React.FC<MUIPhoneProps> = ({
  value,
  onChange,
  ...restProps
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: 'us',
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  return (
    <TextField
      variant="outlined"
      color="primary"
      placeholder="Phone number"
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <StyledInputAdornment position="start">
            <StyledSelect
              MenuProps={{
                style: {
                  top: '10px',
                  left: '-35px',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value as CountryIso2)}
              renderValue={(value) => (
                <FlagImage iso2={value} style={{ display: 'flex' }} />
              )}
              IconComponent={StyledKeyboardArrowDownRounded}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagImage
                      iso2={country.iso2}
                      style={{ marginRight: '8px' }}
                    />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </StyledSelect>
          </StyledInputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};


const StyledInputAdornment = styled(InputAdornment)({
  marginRight: '2px',
  marginLeft: '-8px',
});

const StyledSelect = styled((props: SelectProps<CountryIso2>) => (
  <Select {...props} />
))(({ theme }) => ({
  width: '68px',
  background: 'none',
  '&:hover': {
    background: 'none',
  },
  fieldset: {
    display: 'none',
  },
  '&.Mui-focused:has(div[aria-expanded="false"])': {
    fieldset: {
      display: 'block',
    },
  },
  '.MuiSelect-select': {
    padding: '8px',
    paddingRight: '24px !important',
  },
  '& .MuiList-root': {
    overflow: 'hidden',
  },
  svg: {
    right: 0,
  },
}));

const StyledKeyboardArrowDownRounded = styled(KeyboardArrowDownRounded)({
  position: 'absolute',
  top: 'calc(50% - .5em)',
  pointerEvents: 'none',
  right: 7,
});