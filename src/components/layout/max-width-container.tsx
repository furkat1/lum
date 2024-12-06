import { Box, SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

import styles from "./layout.module.css";

export type MaxWidthContainerProps = { sx?: SxProps } & PropsWithChildren;

export const MaxWidthContainer = ({ sx, children }: MaxWidthContainerProps) => {
  return (
    <Box className={styles.max_width_container} sx={sx}>
      {children}
    </Box>
  );
};
