import React , {Fragment} from 'react' ;
import './cart.css' ;
import {useSelector , useDispatch} from 'react-redux' ;
import { addToCart,removeFromCart} from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import CartItemCard from './cartItemCard';
import axios from 'axios';

const Cart = () => {
    // const dispatch = useDispatch() ;
    // const cart  = useSelector((state) => state.cart.cartItems) ;
    // console.log(cart) ;

    // const increaseQuantity = (id , quantity) => {
    //     dispatch(addToCart({id : id , quantity : ++quantity })) ;
    // }

    // const decreaseQuantity = (id , quantity) => {
    //     if (quantity === 1 ) return;

    //     dispatch(addToCart({id : id , quantity : --quantity})) ;
    // }

    // const deleteCartItem = (id) => {
    //     dispatch(removeFromCart(id));
    // }

    const dispatch=useDispatch();
    const cart = useSelector((state) => state.cart.cartItems);

    const increaseQuantity = async (id, quantity) => {
		const { data } = await axios.get(`/api/v1/product/${id}`);
		if (quantity === data.product.stock) return;
		dispatch(addToCart({ id: id, quantity: quantity + 1 }));
	};

	const decreaseQuantity = async (id, quantity) => {
		if (quantity === 1) return;
		dispatch(addToCart({ id: id, quantity: quantity-1 }));
	};

	const deleteCartItem = (id) => {
		dispatch(removeFromCart(id));
	};

    return (
        <Fragment>
        {cart === undefined ? (
          <div className="emptyCart">
            <RemoveShoppingCartIcon />
  
            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        ) : (
        <Fragment>
            <div className='cartPage'>
                <div className='cartHeader'>
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

                {cart && cart.map((item) => (
                <div className='cartContainer' key={item.product}>
                    <CartItemCard item = {item} deleteCartItem={deleteCartItem} />
                    <div className='cardInput'>
                        <button onClick={() => decreaseQuantity(item.product , item.quantity )}>-</button>
                        <input type='number' value={item.quantity} readOnly />
                        <button onClick={() => increaseQuantity(item.product , item.quantity)}>+</button>
                    </div>
                    <p className='cartSubTotal'> {`${item.price * item.quantity}`} </p>
                </div>
                ))}
                <div className='cartGrossProfit'>
                    <div></div>
                    <div className='cartGrossProfitBox'>
                        <p> Gross Total </p>
                        <p> {`₹${cart.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`} </p>
                    </div>
                    <div></div>
                    <div className='checkOutBtn'>
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
        </Fragment>
        )}
        </Fragment>
    )
} ; 

// const Cart = () => {
//     return <Fragment>
//         <div className='cartPage'>
//                  <div className='cartHeader'>
//                      <p>Product</p>
//                      <p>Quantity</p>
//                      <p>Subtotal</p>
//                  </div>
//         </div>
//     </Fragment>
// }

export default Cart ;