"use client";

import { Box, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

export type ExampleProps = {
  text?: string;
  color?: string;
};

export const Example: FC<ExampleProps> = (props) => {
  const { text, color } = props;

  return (
    <Box>
      <Typography variant="h4">Example shared component</Typography>

      <Stack direction="row" gap={1} alignItems="center">
        <Typography>Text</Typography>
        <Typography>=</Typography>
        <Typography variant="body1" sx={{ color }}>
          {text}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Example;
