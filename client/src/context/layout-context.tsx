"use client";

import { createContext, useContext, useState } from "react";

type LayoutContextType = {
  isHomePage: boolean;
  setIsHomePage: (value: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType>({
  isHomePage: false,
  setIsHomePage: () => {},
});

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isHomePage, setIsHomePage] = useState(false);

  return (
    <LayoutContext.Provider value={{ isHomePage, setIsHomePage }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}