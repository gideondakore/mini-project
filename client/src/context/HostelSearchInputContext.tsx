import React, {
  createContext,
  SetStateAction,
  ReactNode,
  useContext,
} from "react";

type SearchInputType = {
  searchInput: string;
  setSearchInput: React.Dispatch<SetStateAction<string>>;
};

interface SearchInputProviderProp {
  state: SearchInputType;
  children?: ReactNode;
}
const HostelSearchContext = createContext<SearchInputType | null>(null);

export const HostelSearchInputContext = ({
  state,
  children,
}: SearchInputProviderProp) => {
  return (
    <HostelSearchContext.Provider value={state}>
      {children}
    </HostelSearchContext.Provider>
  );
};

export const useHostelSearchInput = () => {
  const searchInput = useContext(HostelSearchContext);

  if (!searchInput) {
    throw new Error(
      "useHostelSearchInput must be in a HostelSearchContext provider"
    );
  }

  return searchInput;
};
