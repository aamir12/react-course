
import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [isAmountValid,setAmountIsValid] = useState(true);
  
  const submitHandler = (event) => {
    event.preventDefault();
    const inputAmount = inputRef.current.value;
    const inputAmountNumber = +inputAmount;
    if( inputAmount.trim().length === 0 || 
        inputAmountNumber < 1 ||
        inputAmountNumber > 5) {
          setAmountIsValid(false);
          return;
    }
    setAmountIsValid(true);
    props.onAddToCart(inputAmountNumber);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input 
        label="Amount" 
        ref={inputRef}
        input={{ 
        id: 'amount_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'}}  />
      <button type="submit">Add</button>
      {!isAmountValid && <div className={classes.inputError}>Please enter valid amount</div>}
    </form>
  )
}

export default MealItemForm
