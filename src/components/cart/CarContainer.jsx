import { useGlobalContext } from "../../context"
import CartItem from "./CartItem"


const CarContainer = () => {
    const {cart, total, clearCart} = useGlobalContext()

    if (cart.length === 0) {
        return (
            
            )
    }

    return (
        <section className="cart">
            <header>
                <h2>your bag</h2>
            </header>
            <div>
                <CartItem />
            </div>
            <footer>
                <hr />
                <div className="cart-total">
                    <h4>
                        total <span></span>
                    </h4>
                </div>
                <button className="btn clear-btn">
                    clear cart
                </button>

            </footer>
        </section>
    )
}

export default CarContainer