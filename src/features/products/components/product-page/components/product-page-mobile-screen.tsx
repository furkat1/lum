"use client";
import { Box, Stack, styled, Tab, Tabs, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

import { useLocalizationProvider } from "@/components/providers/localization-provider";
import { useMachineTypesProvider } from "@/components/providers/machine-types-provider";
import { BackButton } from "@/components/ui/back-button";
import { palette } from "@/config/palette";
import { AddToCart } from "@/features/products/components/product-page/components/add-to-cart/add-to-cart";
import { ClinicalResultSlider } from "@/features/products/components/product-page/components/clinical-result-slider";
import { translate } from "@/lib/language";
import { Product } from "@/types/products";

interface Props {
  product: Product;
}

export const ProductPageMobileScreen = ({ product }: Props) => {
  const { language } = useLocalizationProvider();
  const { machineTypes, loading } = useMachineTypesProvider();
  const [activeTab, setActiveTab] = useState<number>(0);

  const machineType = loading
    ? null
    : machineTypes.find((machineType) => machineType.uuid === product.relatedMachineTypes[0]);

  return (
    <StyledMobileWrapper>
      <Box sx={{ position: "absolute", top: "20px" }}>
        <BackButton />
      </Box>
      <MachineTypeName>{machineType?.name}</MachineTypeName>
      <StyledProductTitle variant="h2">{translate(product.name, language)}</StyledProductTitle>

      <Stack direction="column" gap={0.5}>
        <StyledMainText>{product.code}</StyledMainText>
        <Typography sx={{ color: palette.primary_main }}>
          {product.unitsInPack} Units in pack
        </Typography>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <StyledTabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <StyledTab label="Details" />
          <StyledTab label="Clinical Results" />
          <StyledTab label="Technical Specs" />
        </StyledTabs>

        <StyledTabWrapper>
          {activeTab === 0 && (
            <StyledMainText>{translate(product.description, language)}</StyledMainText>
          )}
          {activeTab === 1 && product.clinicalResults && (
            <Stack direction="column" gap={1}>
              <StyledMainText>{translate(product.clinicalResults, language)}</StyledMainText>
              <ClinicalResultSlider product={product} />
            </Stack>
          )}
          {activeTab === 2 && product.technicalSpecs && (
            <StyledMainText>{translate(product.technicalSpecs, language)}</StyledMainText>
          )}
        </StyledTabWrapper>
      </Box>

      <StyledAddToCartWrapper>
        <AddToCart product={product} />
      </StyledAddToCartWrapper>
    </StyledMobileWrapper>
  );
};

const StyledTabs = styled(Tabs)(() => ({
  borderBottom: "1px solid",
  borderColor: palette.grey,
  "& .MuiTab-root": {
    color: palette.black,
    textTransform: "none",
    fontSize: 16,
    padding: "8px 16px",
    minWidth: "auto",
  },
  "& .Mui-selected": {
    color: palette.black,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: palette.primary_main,
  },
}));

const StyledProductTitle = styled(Typography)(() => ({
  color: palette.black,
  fontSize: 30,
  fontWeight: "600",
}));

const MachineTypeName = styled(Typography)(() => ({
  color: alpha(palette.dark_blue, 0.5),
}));

const StyledMainText = styled(Typography)(() => ({
  color: palette.black,
  fontSize: 16,
}));

const StyledAddToCartWrapper = styled(Box)(() => ({
  padding: 0,
  bottom: 0,
  left: 0,
  position: "fixed",
  width: "100vw",
}));

const StyledMobileWrapper = styled(Stack)(() => ({
  padding: "0 6px",
  minHeight: "70vh",
}));

const StyledTab = styled(Tab)(() => ({
  width: "33%",
}));

const StyledTabWrapper = styled(Box)(() => ({
  mt: 2,
  mb: "90px",
}));
