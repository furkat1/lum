import { Stack } from "@mui/material";
import { redirect } from "next/navigation";

import { Select } from "@/components/ui/select";
import { verifyMachineTypeQuery } from "@/features/machines/actions";
import { MachineTypesFilter } from "@/features/machines/components/machine-types-filter";
import { ProductsGrid } from "@/features/products/components/products-grid";
import { PageParams } from "@/types/page-search-params";

export default async function Products({ searchParams }: PageParams) {
  const { redirectParams } = await verifyMachineTypeQuery(searchParams);

  if (redirectParams) {
    redirect(redirectParams);
  }

  return (
    <Stack sx={{ alignItems: "center", gap: 4, display: "flex", flex: 1 }}>
      <Stack direction="row" alignItems="center" gap={4}>
        <MachineTypesFilter />

        <Select
          options={[{ value: "consumables", label: "Consumables" }]}
          value="consumables"
          inputProps={{
            "aria-label": "Select category",
          }}
        />
      </Stack>

      <ProductsGrid />
    </Stack>
  );
}
