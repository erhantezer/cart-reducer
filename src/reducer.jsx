

export default (state, action) => {
    
    if (action.type === "LOADING") {
        return { ...state, loading: true }
    };

    if (action.type === "CLEAR_CART") {
        return { ...state, cart:[] }
    };

    if (action.type === 'REMOVE') {
        return { ...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.payload)}
    };

    if (action.type === 'DISPLAY_ITEMS') {
        return { ...state, cart: action.payload, loading: false}
    };

    if (action.type === 'INCREASE') {
        
    }

    if (action.type === 'DECREASE') {
        
    }

    if (action.type === 'TOGGLE_AMOUNT') {
        let tempCart = state.cart
    }
}
