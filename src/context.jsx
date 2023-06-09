import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from './reducer';
// import cartItems from "./helper/data";
import axios from "axios";

const AppContext = createContext();

export const useGlobalContext = () => {
    return useContext(AppContext);
};


const initialState = {
    loading: false,
    cart: [],
    total: 0,
    amount: 0,
}

const url = 'https://course-api.com/react-useReducer-cart-project';

export const AppProvider = ({ children }) => {
    // const [loading, setLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    };

    const remove = (id) => {
        dispatch({ type: "REMOVE_CART", payload: id })
    };

    const increase = (id) => {
        dispatch({ type: "INCREASE", payload: id })
    };

    const decrease = (id) => {
        dispatch({ type: "DECREASE", payload: id })
    };

    const toggleAmount = (id, type) => {
        dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } })
    };


    const fetchData = async () => {
        dispatch({ type: "LOADING" });
        const { data } = await axios(url)
        dispatch({ type: "DISPLAY_ITEMS", payload: data })
    };

    useEffect(() => {
        fetchData();
    }, [])


    useEffect(() => {
        dispatch({ type: "GET_TOTALS" })
    }, [state.cart]);

    return (
        <AppContext.Provider value={{
            ...state,
            clearCart,
            remove,
            increase,
            decrease,
            toggleAmount,
            fetchData,
        }}>
            {children}
        </AppContext.Provider>
    )
};