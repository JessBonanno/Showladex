import React, {
  FC, Context, createContext, useState,
} from 'react';

export const ShowsContext: Context<any> = createContext({});

export const ShowsProvider: FC = ({ children }) => {
  const [show, setShow] = useState('a show');
  return (
    <ShowsContext.Provider
      value={{
        show,
        setShow,
      }}
    >
      {children}
    </ShowsContext.Provider>
  );
};
