import styles from '../styles/Navbar.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Navbar = () => {
    let isLoggedIn = useState(false);

    
    return(
      <nav className={styles.navbar}>
  
        <div className={styles.navbar_logo}>
          <Link to="/">
            <span className={styles.title}>2학년 8반</span>
          </Link>
        </div>
        <ul className={styles.navbar_menu}>
          <ul className={styles.navbar_menu}>
            <li className={`${styles.dropdown} ${styles.dropdown_2}`}>
              <Link to="/assignments/homeworks">과제</Link>
            </li>
          </ul>
          <ul className={styles.navbar_menu}>
            <li className={`${styles.dropdown} ${styles.dropdown_2}`}>
              <Link to="/assignments/supplies">준비물</Link>
            </li>
          </ul>
          <li><Link to="/test">안내사항</Link></li>
        </ul>
        

        <ul className={styles.navbar_icon}>
            <a href={isLoggedIn? "/login":"/logout"}>{isLoggedIn? "login":"logout"}</a>
        </ul>

        <a href="#" className={styles.navbar_toggleBtn}>
          <i ></i>
        </a>
      </nav>
    );
}

export default Navbar;