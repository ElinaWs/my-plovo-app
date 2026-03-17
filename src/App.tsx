import { Route, Routes } from "react-router"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Dish } from "./pages/dish/Dish"
import { AddDish } from "./pages/addDish/AddDish"

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dish/:id" element={<Dish />}/>
      <Route path="/dish/create" element={<AddDish />}/>
    </Routes>
    </>
  )
}

export default App
