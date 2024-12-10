"use client";

import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { SegmentsMetaFilters } from '@/types/segments-meta-filters';

const defaultSegmentsMetaData = {
  areaOfInterest: [],
  businessType: [],
  contactTitle: [],
  profession: [],
  positionInClinic: [],
  regionC: [],
  warrantyStatus: [],
};

export const SegmentsMetaContext = createContext<{ segmentsMeta: SegmentsMetaFilters | null; loading: boolean }>(
  {
    segmentsMeta: defaultSegmentsMetaData,
    loading: true,
  },
);

export const SegmentsMetaProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<SegmentsMetaFilters>(defaultSegmentsMetaData);
  const [loading, setLoading] = useState(true);

  const loadSegmentsMeta = async () => {
    try {
      const response = await axios.get<SegmentsMetaFilters>("api/segments/meta");
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSegmentsMeta();
  }, []);

  return (
    <SegmentsMetaContext.Provider value={{ segmentsMeta: data || defaultSegmentsMetaData, loading }}>
      {children}
    </SegmentsMetaContext.Provider>
  );
};

export const useSegmentsMetaProvider = () => {
  return useContext(SegmentsMetaContext);
};
