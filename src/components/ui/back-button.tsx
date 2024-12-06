"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { palette } from "@/config/palette";

import { BackArrowIcon } from "../icon/icons/back-arrow";

export const BackButton = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleBack = () => {
    router.back();
  };

  return (
    <Box sx={styles.container}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={styles.iconButton}
          onClick={handleBack}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <BackArrowIcon fill={isHovered ? palette.black : palette.white} />
        </IconButton>
        <Typography sx={styles.text}>{children}</Typography>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px",
    backgroundColor: "transparent",
    borderRadius: "8px",
    boxShadow: "none",
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: palette.grey,
    color: "white",
    padding: "7.5px 11.25px 7.5px 10.5px",
    filter: "drop-shadow(0.75px 0.75px 3px rgba(0, 0, 0, 0.15))",
    "&:hover": {
      backgroundColor: palette.white,
    },
  },
  text: {
    color: palette.black,
    marginLeft: "32px",
    fontSize: "30px",
    fontWeight: 600,
  },
};
