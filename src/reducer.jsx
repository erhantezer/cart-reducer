

export default (state, action) => {
    
    if (action.type === "LOADING") {
        return { ...state, loading: true }
    }
}
