import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";

import { palette } from "@/config/palette";

export const SubscriptionModal = ({
  open,
  handleClose,
  handleConfirm,
}: {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}) => {
  const t = useTranslations("Cart.SubscriptionModal");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={styles.dialog}>
      <DialogTitle sx={styles.dialogTitle}>{t("yearProgram")}</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Box sx={styles.contentWrapper}>
          <Box component="ul" sx={styles.contentList}>
            <Typography component="li" sx={styles.listItem}>
              {t("benefits.saveTime")}
            </Typography>
            <Typography component="li" sx={styles.listItem}>
              {t("benefits.discountedPrice")}
            </Typography>
            <Typography component="li" sx={styles.listItem}>
              {t("benefits.freeShipping")}
            </Typography>
          </Box>
          <DialogContentText sx={styles.dialogContentText}>
            {t("autoShipmentInfo")}
            <Link href="/" sx={styles.link}>
              {t("conditions")}
            </Link>
            {t("apply")}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button onClick={handleClose} variant="outlined" sx={styles.buttonOutlined}>
          {t("noThanks")}
        </Button>
        <Button onClick={handleConfirm} variant="contained" sx={styles.buttonContained}>
          {t("confirmAutoshipment")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 0,
  },
  dialogTitle: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: 500,
    color: palette.black,
    bgcolor: palette.bg_pink,
    pt: "72px",
    px: "40px",
  },
  dialogContent: {
    p: 0,
    bgcolor: palette.bg_pink,
  },
  contentWrapper: {
    maxWidth: "668px",
    width: "100%",
    px: "40px",
  },
  contentList: {
    color: palette.black,
    display: "flex",
    flexDirection: "column",
    gap: 1,
    mb: "24px",
    pl: 2,
  },
  listItem: {
    fontSize: "18px",
    pl: 1,
  },
  dialogContentText: {
    fontSize: "18px",
    color: palette.black,
    mb: "24px",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    color: palette.primary_main,
    fontWeight: 600,
  },
  dialogActions: {
    justifyContent: "space-between",
    bgcolor: palette.bg_pink,
    pb: "72px",
    px: "40px",
  },
  buttonOutlined: {
    color: palette.black,
    border: `1px solid ${palette.black}`,
    borderRadius: "5px",
    flex: 1,
  },
  buttonContained: {
    flex: 1,
    bgcolor: palette.primary_main,
    color: palette.white,
    boxShadow: "none",
    "&:hover": {
      bgcolor: "#DB6D7D",
    },
  },
};
