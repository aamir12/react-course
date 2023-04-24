import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1})
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => ( 
        <CartItem key={item.id}
         name={item.name} 
         amount={item.amount}
         price={item.price}
         onRemove={cartItemRemoveHandler.bind(null,item.id)}
         onAdd={cartItemAddHandler.bind(null,item)} />
      ))}
    </ul>
  );

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  return (
    <Modal onHideCartModal={props.onHideCartModal}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button type="button" className={classes['button--alt']} onClick={props.onHideCartModal}>Close</button>
        {hasItems && <button type="button" className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

