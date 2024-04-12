import React , {Fragment} from 'react' ;
import './cart.css' ;
import cartItemCard from './cartItemCard' ;
import {useSelector , useDispatch} from 'react-redux' ;
import { addToCart , removeFromCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const Cart = () => {
    const dispatch = useDispatch() ;
    const { cart } = useSelector((state) => state.cart) ;

    const increaseQuantity = (id , quantity , stock) => {
        if(quantity >= stock) return ; 
        dispatch(addToCart({id : id , quantity : 1 })) ;
    }

    const decreaseQuantity = (id , quantity) => {
        if(quantity <= 1) return ; 
        dispatch(removeFromCart({id : id , quantity : 1 })) ;
    }

    const deleteCardItem = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <Fragment>
        {cart.length === 0 ? (
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
                <div className='cartContainer' key={item.id}>
                    <cartItemCard item ={item} deleteCardItem = {deleteCardItem} />
                    <div className='cardInput'>
                        <button onClick={() => decreaseQuantity(item._id , item.quantity , item.stock)}>-</button>
                        <input type='number' value={item.quantity} readOnly />
                        <button onClick={() => increaseQuantity(item._id , item.quantity)}>+</button>
                    </div>
                    <p className='cartSubTotal'> {`${item.price * item.quantity}`} </p>
                </div>
                ))}
                <div className='cartGrossProfit'>
                    <div></div>
                    <div className='cartGrossProfitBox'>
                        <p> Gross Total </p>
                        <p> </p>
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

export default Cart ;