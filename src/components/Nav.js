import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { removeToken, removeUser } from '../api/apiService';
import { AuthContext } from '../context/authContextComponent';
import logoFile from '../assets/dw_logoAsset.svg'
import hamburgerIcon from '../assets/Hamburger.png'
import './Nav.css';

function Nav() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isStickyNavHidden, setIsStickyNavHidden] = useState(false);

  const handleSignOut = () => {
    removeToken();
    removeUser();
    navigate('/');
    window.location.reload();
  }

  const menuRef = useRef(null);
  // const navbarRef = useRef(null);
  

  const openMenu = () => {
    gsap.to(menuRef.current, {
      duration: 1,
      left: "0%",
      opacity: 1,
      ease: "bounce.out",
      onStart: () => {
        setIsStickyNavHidden(true);
      },
    });
    // gsap.set(navbarRef.current, { 
    //   duration: 1,
    //   top: "-100%",
    //   opacity: 0,
    //   ease: "power0.in",
    // });
  };

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      duration: 0.5,
      left: "-100%",
      opacity: 0,
      ease: "power0.in",
      onComplete: () => {
        setIsStickyNavHidden(false);
      },
    });
    // gsap.set(navbarRef.current, { 
    //   duration: 2,
    //   top: "0%",
    //   opacity: 0.8,
    //   ease: "slowmo.out",
    // });
  };

  useEffect(() => {
    gsap.set(menuRef.current, { left: "-100%", opacity: 0 });
    // gsap.set(navbarRef.current, { opacity: 0.8 });
  }, []);

  // useEffect(() => {
  //   if (isStickyNavHidden) {
  //     gsap.fromTo(
  //       '#sticky-nav',
  //       { opacity: 0 },
  //       { opacity: 0.8, duration: 1, ease: 'power2.out' }
  //     );
  //   }
  // }, [isStickyNavHidden]);



  return (
    <>
      {!isStickyNavHidden && (
        <div id="sticky-nav" className="sticky-nav bg-slate-50">
        {/* <div className="sticky-nav max-h-20 bg-slate-50" ref={navbarRef}> */}
          <div className="flex flex-col items-center justify-center overflow-y-auto">
            <button onClick={openMenu} className="absolute top-0 right-0 my-10 mr-1 flex items-center justify-center"><img src={hamburgerIcon} className="w-1/3" /></button>
            <a href="/">
              <img src={logoFile} className="absolute top-0 left-0 my-10 ml-8 w-1/3 max-h-6" />
            </a>
          </div>
        </div>
      )}
      <nav ref={menuRef} className="navbar fixed w-full h-screen bg-white text-black top-0">
        <ul className="hamburger font-bold text-2xl flex flex-col mx-16 pt-32">
        <li onClick={closeMenu}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={closeMenu} className="mt-12">
            <Link to="/">Home</Link>
          </li>
          <li onClick={closeMenu} className="mt-12">
            <Link to="/create-campaign">Create Campaign</Link>
          </li>
          <li onClick={closeMenu} className="mt-12">
            <Link to="/myaccount">My Account</Link>
          </li>
          <li onClick={closeMenu} className="mt-12">
            {isLoggedIn ? (
              <button onClick={handleSignOut}>Sign Out</button>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </li>
        </ul>
        <a href="/">
              <img src="assets/dw_logoAsset.svg" className="absolute top-0 left-0 my-10 ml-8 w-1/3" />
            </a>
        <button onClick={closeMenu} className="absolute top-0 right-0 my-8 mr-10 flex items-center justify-center text-black rounded text-2xl font-bold">
          X
        </button>
      </nav>
    </>
  )
}

export default Nav;
