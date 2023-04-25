# CART

## App.jsx
```js
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home/>
    </>
  )
}

export default App;
```

## Home:jsx
```js
import Navbar from '../components/Navbar';
import CarContainer from '../components/cart/CarContainer';
import { useGlobalContext } from '../context';

const Home = () => {
    const { loading } = useGlobalContext();

    return (
        <>
            {loading ?
                (<div className='loading' >
                    <h1>Loading...</h1>
                </div >) : (
                    <main>
                        <Navbar />
                        <CarContainer />
                    </main>
                )
            }
        </>
    )
}

export default Home;
```

## Navbar.jsx
```js
import { useGlobalContext } from "../context";

const Navbar = () => {
 const {amount} = useGlobalContext()
    
    return (
        <nav>
            <div className='nav-center'>
                <h3>useReducer</h3>
                <div className='nav-container'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z' />
                    </svg>
                    <div className='amount-container'>
                        <p className='total-amount'>{amount}</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
```

## CartContainer.jsx
```js
import { useGlobalContext } from "../../context"
import CartItem from "./CartItem"

const CarContainer = () => {
    const { cart, total, clearCart, fetchData } = useGlobalContext()

    if (cart.length === 0) {
        return (
            <section className='cart'>
                <header>
                    <h2>your bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                    <button className="btn reloaded-btn" onClick={() => fetchData()}>
                        reloaded
                    </button>
                </header>
            </section>
        )
    }

    return (
        <section className="cart">
            <header>
                <h2>your bag</h2>
            </header>
            <div>
                {cart.map((item) => {
                    return <CartItem key={item.id} {...item} />
                })}
            </div>
            <footer>
                <hr />
                <div className="cart-total">
                    <h4>
                        total <span>${total}</span>
                    </h4>
                </div>
                <button className="btn clear-btn" onClick={() => clearCart()}>
                    clear cart
                </button>

            </footer>
        </section>
    )
}

export default CarContainer
```

##
```js
import { useGlobalContext } from "../../context"


const CartItem = ({ id, img, title, price, amount }) => {
    const {remove, increase, decrease, toggleAmount} = useGlobalContext();

    return (
        <article className="cart-item">
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className="item-price">${price}</h4>
                <button className="remove-btn" onClick={() => remove(id)}>
                    remove
                </button>
            </div>
            <div>
                <button className="amount-btn" onClick={() => toggleAmount(id, 'inc')}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
                    </svg>
                </button>
                <p className="amount">{amount}</p>
                <button className='amount-btn' onClick={() => toggleAmount(id, 'dec')}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                </button>
            </div>
        </article>
    )
}

export default CartItem;
```

## context.jsx
```js
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
```

## reducer.jsx
```js
export default (state, action) => {
    
    if (action.type === "LOADING") {
        return { ...state, loading: true }
    };

    if (action.type === "CLEAR_CART") {
        return { ...state, cart:[] }
    };

    if (action.type === 'REMOVE_CART') {
        return { ...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.payload)}
    };

    if (action.type === 'DISPLAY_ITEMS') {
        return { ...state, cart: action.payload, loading: false}
    };


    if (action.type === 'GET_TOTALS') {
        let { total, amount } = state.cart.reduce(
            (cartTotal, cartItem) => {
                const { price, amount } = cartItem
                const itemTotal = price * amount

                cartTotal.total += itemTotal
                cartTotal.amount += amount
                return cartTotal
            },
            {
                total: 0,
                amount: 0,
            }
        )
        total = parseFloat(total.toFixed(2))

        return { ...state, total, amount }
    }

    if (action.type === 'INCREASE') {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount + 1 }
            }
            return cartItem
        })
        return { ...state, cart: tempCart }
    }

    if (action.type === 'DECREASE') {
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload) {
                    return { ...cartItem, amount: cartItem.amount - 1 }
                }
                return cartItem
            })
            .filter((cartItem) => cartItem.amount !== 0)
        return { ...state, cart: tempCart }
    }

    if (action.type === 'TOGGLE_AMOUNT') {
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    if (action.payload.type === 'inc') {
                        return { ...cartItem, amount: cartItem.amount + 1 }
                    }
                    if (action.payload.type === 'dec') {
                        return { ...cartItem, amount: cartItem.amount - 1 }
                    }
                }
                return cartItem
            })
            .filter((cartItem) => cartItem.amount !== 0)
        return { ...state, cart: tempCart }
    }
    throw new Error('no matching action type')

}

```

```md
│   App.jsx
│   context.jsx
│   index.css
│   main.jsx
│   reducer.jsx
│
├───assets
│       react.svg
│
├───components
│   │   Navbar.jsx
│   │
│   └───cart
│           CarContainer.jsx
│           CartItem.jsx
│
├───helper
│       data.jsx
│
└───pages
        Home.jsx
```