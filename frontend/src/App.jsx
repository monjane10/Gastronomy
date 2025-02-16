import NavBar from "./components/navBar/navBar"; 
import Footer from "./components/footer/footer";
import { Outlet } from "react-router-dom";

export default function App() {


  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      
    </>
  )
}


