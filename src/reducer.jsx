

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

    
}
