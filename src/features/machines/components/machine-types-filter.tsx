"use client";

import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

import { useMachineTypesProvider } from "@/components/providers/machine-types-provider";
import { Select, SelectSkeleton } from "@/components/ui/select";
import { SEARCH_PARAMS } from "@/config/search-params";

export const MachineTypesFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { machineTypes, loading } = useMachineTypesProvider();

  const [machineType, setMachineType] = useState(searchParams.get(SEARCH_PARAMS.MACHINE_TYPE));

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      params.set(SEARCH_PARAMS.MACHINE_TYPE, value);

      axios.put("/api/machinetypes", {
        machineType: value,
      });

      setMachineType(value);
      push(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams],
  );

  const options = machineTypes.map((item) => ({ value: item.uuid, label: item.name })) || [];

  if (loading) {
    return <SelectSkeleton />;
  }

  return (
    <Select
      value={machineType}
      onChange={handleChange}
      options={options}
      inputProps={{
        "aria-label": "Select device",
      }}
    />
  );
};
