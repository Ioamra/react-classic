import React from 'react';
import Navbar from '../../components/navbar/navbar';

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <main>
                <h1>Page d'acceuil</h1>
            </main>
        </div>
    );
};

export default HomePage;