import { useContext } from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {

  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`
  const addToCart = (amount) => {
    const item = {
      id:props.id,
      name:props.name,
      description:props.description,
      price:props.price,
      amount
    };
    
    cartCtx.addItem(item);
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3> {props.name} </h3>
        <div className={classes.description}> {props.description}   </div>
        <div className={classes.price}> {price} </div>
      </div>
      <div>
        <MealItemForm  id={props.id} onAddToCart={addToCart}/>
      </div>
    </li>
  )
}

export default MealItem
