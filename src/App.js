import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown,setCartIsShown] = useState(false);

  const showCartModal = () => {
    setCartIsShown(true);
  }

  const hideCartModal = () => {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
     {cartIsShown && <Cart onHideCartModal={hideCartModal} />}
     <Header onShowCartModal={showCartModal} />
     <main>
        <Meals />
     </main>
    </CartProvider>
  );
}

export default App;
