import { Button, Popover, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import CartSuccess from "@/app/assets/CartSuccess.svg";
import SomethingWrong from "@/app/assets/SomethingWrong.svg";
import { palette } from "@/config/palette";
import { APP_ROUTES } from "@/config/routes";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
}

export const AddToCartModal = ({ isOpen, setIsOpen, isError }: Props) => {
  return (
    <Popover
      open={isOpen}
      transformOrigin={{ vertical: "center", horizontal: "center" }}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      onClose={() => setIsOpen(false)}
    >
      <StyledContent direction="column" justifyContent="center" alignItems="center" gap={3}>
        {isError ? (
          <>
            <Image src={SomethingWrong} alt="" width={100} height={98} />
            <StyledText>
              Oops, something went wrong and the Item was not added to the cart
            </StyledText>
            <StyledContainedButton variant="contained">
              <Link href={APP_ROUTES.CART}>Go to cart</Link>
            </StyledContainedButton>
          </>
        ) : (
          <>
            <Image src={CartSuccess} alt="" width={100} height={98} />
            <StyledTitle>Successfully added to cart</StyledTitle>
            <Stack direction="row" gap={1}>
              <StyledOutlinedButton variant="outlined">
                <Link href={APP_ROUTES.PRODUCTS}>Back to store</Link>
              </StyledOutlinedButton>
              <StyledContainedButton variant="contained">
                <Link href={APP_ROUTES.CART}>Go to cart</Link>
              </StyledContainedButton>
            </Stack>
          </>
        )}
      </StyledContent>
    </Popover>
  );
};

const StyledContent = styled(Stack)(() => ({
  background: palette.bg_pink,
  padding: "108px 75px",
}));

const StyledTitle = styled(Typography)(() => ({
  color: palette.black,
  fontSize: "30px",
  fontWeight: 600,
}));

const StyledOutlinedButton = styled(Button)(() => ({
  color: palette.black,
  borderColor: palette.black,
}));

const StyledContainedButton = styled(Button)(() => ({
  color: palette.white,
}));

const StyledText = styled(Typography)(() => ({
  color: palette.black,
  fontSize: "18px",
  fontWeight: 400,
}));
