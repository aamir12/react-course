import React, { useReducer } from 'react'
import CartContext from './cart-context'


const defaultCartState = {
  items:[],
  totalAmount:0
}
const cartReducer = function(state,action) {
  if(action.type === 'ADD') {
    const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existCartItem = state.items[existItemIndex];
    let updatedItems;
    if(existCartItem) {
      const updatedItem = {
        ...existCartItem ,
        amount: existCartItem.amount +  action.item.amount 
      };

      updatedItems = [...state.items];
      updatedItems[existItemIndex] = updatedItem;
    }else {
      updatedItems = state.items.concat(action.item);
    }
    
    return {
      items:updatedItems,
      totalAmount:updateTotalAmount
    }
  }

  if(action.type === 'REMOVE') {
    const existItemIndex = state.items.findIndex(item => item.id === action.id);
    const existCartItem = state.items[existItemIndex];
    const updateTotalAmount = state.totalAmount - existCartItem.price;

    let updatedItems;
    if(existCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updateItem = {...existCartItem,amount :existCartItem.amount -1 }
      updatedItems = [...state.items];
      updatedItems[existItemIndex] = updateItem;
    }
    
    return {
      items:updatedItems,
      totalAmount:updateTotalAmount
    }
  }

  return defaultCartState;
}

const CartProvider = (props) => {

  const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);

  const addItemToCartHandler = (item) => {
   dispatchCartAction({
    type:'ADD',
    item
   })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type:'REMOVE',
      id
     })
  }

  const cartContext = {
    addItem:addItemToCartHandler,
    removeItem:removeItemFromCartHandler,
    items:cartState.items,
    totalAmount:cartState.totalAmount
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
