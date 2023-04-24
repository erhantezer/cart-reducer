

export default (state, action) => {
    
    if (action.type === "LOADING") {
        return { ...state, loading: true }
    };

    if (action.type === "CLEAR_CART") {
        return { ...state, total: 0, amount: 0, loading: false, cart:[] }
    }
}
