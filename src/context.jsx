import { createContext, useContext, useState } from "react";
import reducer from './reducer';
import cartItems from "./helper/data";

const AppContext = createContext();

export const useGlobalContext = () => {
    return useContext(AppContext);
};


const url = 'https://course-api.com/react-useReducer-cart-project';

export const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false);

    return (
        <AppContext.Provider>
            {children}
        </AppContext.Provider>
        )
};