"use client";
import { Box, Stack, styled, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { useLocalizationProvider } from "@/components/providers/localization-provider";
import { useMachineTypesProvider } from "@/components/providers/machine-types-provider";
import { palette } from "@/config/palette";
import { translate } from "@/lib/language";
import { Product } from "@/types/products";

import { ClinicalResultSlider } from "../components/clinical-result-slider";
import { AddToCart } from "./add-to-cart/add-to-cart";

interface Props {
  product: Product;
}

export const ProductPageDesktopScreen = ({ product }: Props) => {
  const { language } = useLocalizationProvider();
  const { machineTypes, loading } = useMachineTypesProvider();

  const machineType = loading
    ? null
    : machineTypes.find((machineType) => machineType.uuid === product.relatedMachineTypes[0]);

  return (
    <>
      <Stack direction="column" gap={2} sx={{ gridArea: "title" }}>
        <StyledProductTitle variant="h2">{translate(product.name, language)}</StyledProductTitle>
        <Stack direction="column" gap={1}>
          <MachineTypeName>{machineType?.name}</MachineTypeName>
          <StyledMainText>{product.code}</StyledMainText>
          <Typography sx={{ color: palette.primary_main }}>
            {product.unitsInPack} Units in pack
          </Typography>
        </Stack>
      </Stack>

      <Stack gap={1} sx={{ gridArea: "details" }}>
        <StyledSubtitle>Details</StyledSubtitle>
        <StyledMainText>{translate(product.description, language)}</StyledMainText>
      </Stack>

      {product.clinicalResults && (
        <Stack direction="column" gap={1} sx={{ gridArea: "clinicalResults" }}>
          <StyledSubtitle>Clinical results</StyledSubtitle>
          <Stack direction="row" gap={1}>
            <Box width={"50%"}>
              <StyledMainText>{translate(product.clinicalResults, language)}</StyledMainText>
            </Box>
            <ClinicalResultSlider product={product} />
          </Stack>
        </Stack>
      )}

      {product.technicalSpecs && (
        <Stack direction="column" gap={1} sx={{ gridArea: "technicalSpecs" }}>
          <StyledSubtitle>Technical specs</StyledSubtitle>
          <Box width={"50%"}>
            <StyledMainText>{translate(product.technicalSpecs, language)}</StyledMainText>
          </Box>
        </Stack>
      )}
      <StyledAddToCartWrapper>
        <AddToCart product={product} />
      </StyledAddToCartWrapper>
    </>
  );
};

const StyledProductTitle = styled(Typography)(() => ({
  color: palette.black,
  fontSize: 30,
  fontWeight: "600",
}));

const MachineTypeName = styled(Typography)(() => ({
  color: alpha(palette.dark_blue, 0.5),
}));

const StyledSubtitle = styled(Typography)(() => ({
  color: palette.black,
  fontWeight: 700,
  fontSize: 18,
}));

const StyledMainText = styled(Typography)(() => ({
  color: palette.black,
  fontSize: 16,
}));

const StyledAddToCartWrapper = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  gridArea: "addToCart",
  padding: "0 27px ",
  bottom: "27px",
  width: "50vw",
  position: "fixed",
  right: 0,
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    position: "static",
    padding: 0,
    paddingBottom: "38px",
  },
}));
