"use client";

import { KeyboardArrowDownRounded } from "@mui/icons-material";
import {
  FormControl,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";

import { SelectOption } from "@/types/select-option";

type Props = Omit<MuiSelectProps, "onChange"> & {
  options: SelectOption[];
  onChange?: (value: string) => void;
};

export const Select: FC<Props> = (props) => {
  const { options, onChange, ...rest } = props;

  return (
    <FormControl size="small">
      <MuiSelect
        {...rest}
        onChange={(e) => onChange && onChange(e.target.value as string)}
        IconComponent={() => (
          <KeyboardArrowDownRounded
            id="select-arrow-down"
            sx={{
              position: "absolute",
              top: "calc(50% - .5em)",
              pointerEvents: "none",
              right: 7,
            }}
          />
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export const SelectSkeleton = () => {
  return <Skeleton width={148} height={32} variant="rounded" sx={{ borderRadius: "6px" }} />;
};
