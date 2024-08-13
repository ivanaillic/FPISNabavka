import React from 'react';
import vinarijaImage from '../assets/vinarija2.jpg';

const Home = () => {
    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center" style={{
                fontSize: '2.5rem',
                fontFamily: '"Georgia", serif',
                fontWeight: 'bold',
                color: '#6c757d'
            }}>
                Dobrodošli u Vinariju "In vino veritas"
            </h1>

            <p className="text-center mb-4">
                Proces nabavke u našoj vinariji ključan je za održavanje kvaliteta naših vina.<br />
                Ova aplikacija omogućava efikasno upravljanje nabavkama i saradnju sa dobavljačima.
            </p>

            <div className="text-center">
                <img
                    src={vinarijaImage}
                    alt="Vinarija"
                    style={{
                        maxWidth: '60%',
                        height: 'auto',
                        border: '5px solid #c82333',
                        borderRadius: '50px'
                    }}
                />
            </div>

        </div>
    );
};

export default Home;
