import { useState } from 'react';
import styles from './navBar.module.css'
import { LuShoppingCart, LuUser, LuMenu } from "react-icons/lu";
import {Drawer} from "@mui/material";
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => setOpenMenu(!openMenu);


    return (
        <nav className={styles.navBarContainer}>
            <div className={styles.navBarItems}>
                <Link to={"/"}>
                  <img className={styles.logo} src="/logo.png" alt="logotipo" />
                </Link>
              
                <div className={styles.navBarLinksContainer}>
                    <Link to={"/"} className={styles.navBarLink} >Home</Link>
                    <Link to={"/plates"} className={styles.navBarLink} >Plates</Link>
                    <Link to={"/cart"}>
                      <LuShoppingCart className={styles.navBarLink} />
                    </Link>
                    <Link to={"/profile"}>
                    <LuUser className={styles.navBarLink} />
                    </Link>
                   
                </div>
            </div>

            <div className={styles.mobileNavBarItems}>
            <Link to={"/"}>
                  <img className={styles.logo} src="/logo.png" alt="logotipo" />
                </Link>
                <div className={styles.mobileNavBarBtn}>
                <Link to={"/cart"}>
                      <LuShoppingCart className={styles.navBarLink} />
                    </Link>
                    <LuMenu className={styles.navBarLink}  onClick={handleOpenMenu}/>
                </div>
            </div>
            <Drawer
      anchor='right'
      open={openMenu}
      onClose={handleOpenMenu}
    >
        <div  className={styles.drawerContainer}>
         <Link to={"/"} className={styles.navBarLink} >Home</Link>
         <Link to={"/plates"} className={styles.navBarLink}>Plates</Link>
         <Link to={"/profile"} className={styles.navBarLink} >Profile</Link>
        </div>
    </Drawer>


        </nav>
    )
}