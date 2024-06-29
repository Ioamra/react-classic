import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../modals/auth-modal/auth-modal';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg';
import './navbar.scss';

const Navbar: React.FC = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openAuthModal = () => setShowModal(true);
    const closeAuthModal = () => setShowModal(false);


    const handleClickBrand = () => {

    }

    const toogleShowNavLinks = () => {
        setShowNavLinks(!showNavLinks);
    }

    return (
        <nav>
            <section className='nav--headers'>
                <section className='navbar-brand clickable text--xl text--bold' onClick={handleClickBrand}>
                    React-classic
                </section>
                <MenuIcon className='navbar-toggler-icon' onClick={toogleShowNavLinks}/>
            </section>
            <ul className={`nav--links ${showNavLinks ? 'show' : ''}`}>
                <li>
                    <Link to='/'>Accueil</Link>
                </li>
                <li>
                    <Link to='/'>Contact</Link>
                </li>
                <li>
                    <button className='nav-link' onClick={openAuthModal}>Connexion</button>
                </li>
            </ul>
            {showModal && <AuthModal onClose={closeAuthModal}/>}
        </nav>
    );
};

export default Navbar;
