import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context';

//console.log(crypto.randomUUID())

const HeaderCartButton = (props) => {
  const [btnIsHighLighted,setBtnIsHighLighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numbrOfCartItems = items.reduce((currNumber,item)=>{
    return currNumber + item.amount;
  },0);

  const btnClasses = `${classes.button} ${ btnIsHighLighted ? classes.bump : ''}`;

  useEffect(()=>{
    if(items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);
    
    const timer = setTimeout(()=>{
      setBtnIsHighLighted(false);
    },300);

    return () => {
      clearTimeout(timer);
    }
  },[items])

  return (
    <button className={btnClasses} onClick={props.onShowCartModal}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>
        Your Cart
      </span>
      <span className={classes.badge}>
        {numbrOfCartItems}
      </span>
      
    </button>
  )
}

export default HeaderCartButton
