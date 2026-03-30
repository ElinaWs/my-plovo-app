import { Route, Routes } from "react-router"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Dish } from "./pages/dish/Dish"
import { AddDish } from "./pages/addDish/AddDish"
import { Container } from "@mui/material"
import { EditDish } from "./pages/editDish/EditDish"
import { useState } from "react"
import type { IBasketState, IDish } from "./types"
import { Basket } from "./pages/basket/Basket"
import { addDishToBasket, increaseDishCount, decreaseDishCount } from "./utils/BasketHelpers"

function App() {

  const [ basket, setBasket ] = useState<IBasketState>(
    {
      items: [],
      totalCount: 0,
      totalPrice: 0
    }
  )

  const handleIncrease = (id: string) => {
  setBasket(prev => increaseDishCount(prev, id));
  };

  const handleDecrease = (id: string) => {
    setBasket(prev => decreaseDishCount(prev, id));
  };

  const clearBasket = () => {
    setBasket({
      items: [],
      totalCount: 0,
      totalPrice: 0
    });
  };

  console.log(basket)

  const handleAddDish = (dish: IDish) => {
    setBasket(prev => addDishToBasket(prev, dish));
  };

  return (
    <>
    <Header totalCount={basket.totalCount} totalPrice={basket.totalPrice}/>
    <Container style={{
      padding:"20px"
    }}>
      <Routes>
        <Route path="/" element={<Home addDishToBasket={handleAddDish}/>}/>
        <Route path="/dish/:id" element={<Dish />}/>
        <Route path="/dish/create" element={<AddDish />}/>
        <Route path="/dish/edit/:id" element={<EditDish />}/>
        <Route path="/basket" element={<Basket basketState={basket}
                                                onIncrease={handleIncrease}
                                                onDecrease={handleDecrease}
                                                clearBasket={clearBasket} />}/>
      </Routes>
    </Container>
    
    </>
  )
}

export default App
