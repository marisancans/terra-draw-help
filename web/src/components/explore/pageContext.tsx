import React, { createContext, use, useEffect } from "react";
import { useState } from "react";

import { api } from "~/utils/api";

interface IContext {
  currentEstate: any;
  setCurrentEstate: (currentEstate: any) => void;
  estates: any[];
  setEstates: (estates: any[]) => void;
}

export const ExplorePageContext = createContext<IContext>({
  currentEstate: null,
  setCurrentEstate: () => {},
  estates: [],
  setEstates: () => {},
});

export const PageContext = ({ children }: { children: React.ReactNode }) => {
  const [estates, setEstates] = useState<any[]>([]);
  const [currentEstate, setCurrentEstate] = useState<any>({});

  return (
    <ExplorePageContext.Provider
      value={{
        currentEstate,
        setCurrentEstate,
        estates,
        setEstates,
      }}
    >
      {children}
    </ExplorePageContext.Provider>
  );
};
