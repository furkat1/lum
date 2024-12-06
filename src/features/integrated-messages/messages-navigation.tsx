import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Skeleton } from "@mui/material";

import { palette } from "@/config/palette";

import styles from "./integrated-messages.module.css";
import { IntegratedMessage } from "./types/messages";

type MessageNavigationProps = {
  data: IntegratedMessage[];
  visibleItemsCount: number;
  currentIndex: number;
  loading: boolean;
  prev: () => void;
  next: () => void;
  scrollToIndex: (idx: number) => void;
};

export const MessagesNavigation = (props: MessageNavigationProps) => {
  const { data, visibleItemsCount, loading, currentIndex, prev, next, scrollToIndex } = props;

  return loading ? (
    <MessagesNavigationSkeleton />
  ) : (
    data.length > 0 && (
      <Box className={styles.navigation} sx={{ display: "flex" }}>
        <IconButton
          onClick={prev}
          disabled={currentIndex === 0}
          className={styles.navigation_button}
          sx={{ marginLeft: "auto" }}
          disableRipple={true}
        >
          <ArrowBackIosIcon sx={{ width: "18px", height: "18px" }} />
        </IconButton>
        {data.slice(0, data.length - visibleItemsCount + 1).map((_, i) => {
          return (
            <IconButton
              key={i}
              onClick={() => scrollToIndex(i)}
              className={styles.navigation_button}
              disableRipple={true}
            >
              <Box
                className={styles.navigation_point}
                sx={{ backgroundColor: currentIndex === i ? palette.primary_main : palette.white }}
              ></Box>
            </IconButton>
          );
        })}
        <IconButton
          onClick={next}
          disabled={currentIndex >= data.length - visibleItemsCount}
          className={styles.navigation_button}
          sx={{ marginRight: "auto" }}
          disableRipple={true}
        >
          <ArrowForwardIosIcon sx={{ width: "18px", height: "18px" }} />
        </IconButton>
      </Box>
    )
  );
};

const MessagesNavigationSkeleton = () => {
  return (
    <Box sx={{ padding: "8px" }} className={styles.navigation} display={"flex"}>
      <Skeleton variant="rectangular" width={136} height={18} sx={{ margin: "0 auto auto auto" }} />
    </Box>
  );
};
