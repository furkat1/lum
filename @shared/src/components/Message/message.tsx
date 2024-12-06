import { Box, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

type TextAlignment = "LEFT" | "CENTER" | "RIGHT";

type MessageProps = {
  title?: string;
  text?: string;
  textAlignment?: TextAlignment;
  backgroundImage?: ReactNode | null;
  width?: number;
  height?: number;
};

export const Message = ({
  title,
  text,
  textAlignment,
  width,
  height,
  backgroundImage = null,
}: MessageProps) => {
  return (
    <Stack
      sx={{
        alignItems: mapTextAligmentToFlex(textAlignment),
        backgroundColor: backgroundImage ? "none" : "#F5F5F5",
        width: `${width || 310}px`,
        height: `${height || 145}px`,
        ...styles.container,
      }}
    >
      {backgroundImage && <Box sx={styles.backgroundImage}>{backgroundImage}</Box>}
      <Stack sx={styles.textContainer}>
        {title ? <Typography sx={styles.title}>{title}</Typography> : null}
        {text ? <Typography sx={styles.text}>{text}</Typography> : null}
      </Stack>
    </Stack>
  );
};

const mapTextAligmentToFlex = (textAlignment?: TextAlignment) => {
  switch (textAlignment) {
    case "LEFT":
      return "flex-start";
    case "CENTER":
      return "center";
    case "RIGHT":
      return "flex-end";
    default:
      return "center";
  }
};

const styles = {
  container: {
    padding: "12px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "16px",
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
    userSelect: "none",
  },
  textContainer: {
    alignItems: "center",
    width: 161,
  },
  title: {
    fontFamily: '"Nunito", sans-serif',
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "22px",
    textAlign: "center",
    color: "#000",
    wordBreak: "break-word",
    marginBottom: "5px",
  },
  text: {
    fontFamily: '"Nunito", sans-serif',
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20.8px",
    textAlign: "center",
    color: "#000",
    wordBreak: "break-word",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    ["img"]: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "16px",
    },
  },
};
