import NavBar from "./components/navBar/navBar"; 
import { Outlet } from "react-router-dom";

export default function App() {


  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}


