"use client";

import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { MachineType, PaginatedResponse } from "@/types";

export const MachineTypesContext = createContext<{ machineTypes: MachineType[]; loading: boolean }>(
  {
    machineTypes: [],
    loading: true,
  },
);

export const MachineTypesProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<PaginatedResponse<MachineType> | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMachineTypes = async () => {
    try {
      const response = await axios.get<PaginatedResponse<MachineType>>("/api/machinetypes");
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMachineTypes();
  }, []);

  return (
    <MachineTypesContext.Provider value={{ machineTypes: data?.items || [], loading }}>
      {children}
    </MachineTypesContext.Provider>
  );
};

export const useMachineTypesProvider = () => {
  return useContext(MachineTypesContext);
};
