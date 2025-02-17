import NavBar from "./components/navBar/navBar"; 
import Footer from "./components/footer/footer";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/useCartContext";

export default function App() {


  return (
    <>
    <CartProvider>
    <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
    
      
    </>
  )
}


