import React, { useState } from 'react';
import AuthModal from '../../components/auth-modal/auth-modal';

const Navbar: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(true);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    return (
        <div>
            <AuthModal visible={modalVisible} onClose={closeModal} />
        </div>
    );
};

export default Navbar;