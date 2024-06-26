import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../modals/auth-modal/auth-modal';

const Navbar: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const openAuthModal = () => setShowModal(true);
    const closeAuthModal = () => setShowModal(false);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <button onClick={openAuthModal}>Connexion</button>
                </li>
            </ul>
            {showModal && <AuthModal onClose={closeAuthModal}/>}
        </nav>
    );
};

export default Navbar;
