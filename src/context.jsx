import { createContext, useContext } from "react";

const AppContext = createContext();

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({children}) => {

    return (
        <AppContext.Provider>
            {children}
        </AppContext.Provider>
        )
}