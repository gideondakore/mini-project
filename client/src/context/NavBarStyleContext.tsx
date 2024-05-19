import React, { createContext, useContext, ReactNode } from "react";

type StyleType = {
  [key: string]: string;
};

interface StylesProviderProp {
  styles: StyleType;
  children?: ReactNode;
}

const StylesContext = createContext<StyleType | null>(null);

export const StylesProvider = ({ styles, children }: StylesProviderProp) => {
  return (
    <StylesContext.Provider value={styles}>{children}</StylesContext.Provider>
  );
};

export const useStyles = () => {
  const styles = useContext(StylesContext);
  if (!styles) {
    throw new Error("useStyles must be use within StylesProvider");
  }
  return styles;
};
