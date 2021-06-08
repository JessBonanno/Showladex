import React, {
  FC, Context, createContext, useState,
} from 'react';

export const NavigationContext: Context<any> = createContext({});

export const NavigationProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <NavigationContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
