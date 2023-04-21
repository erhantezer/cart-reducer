import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from './reducer';
import cartItems from "./helper/data";
import axios from "axios";

const AppContext = createContext();

export const useGlobalContext = () => {
    return useContext(AppContext);
};

const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
}


const url = 'https://course-api.com/react-useReducer-cart-project';

export const AppProvider = ({children}) => {
    // const [loading, setLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        dispatch({type: "LOADING"});
        const {data} = await axios(url)
        dispatch({type: "DISPLAY_ITEMS", payload: data})
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
        )
};