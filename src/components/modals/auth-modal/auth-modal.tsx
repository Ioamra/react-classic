import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';
import '../../../assets/scss/main.scss';
import '../../../assets/scss/modal.scss';
import './auth-modal.scss';

interface AuthModalProps {
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
    const [modalType, setModalType] = useState('login');
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [registerFormData, setRegisterFormData] = useState({
        email: '',
        password_one: '',
        password_two: ''
    });
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        if (modalType === 'login') {
            if (type === 'checkbox') {
                setLoginFormData(prevData => ({
                    ...prevData,
                    [name]: checked
                }));
            } else {
                setLoginFormData(prevData => ({
                    ...prevData,
                    [name]: value
                }));
            }
        } else if (modalType === 'register') {
            setRegisterFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if (modalType === 'forgot password') {
            setForgotPasswordEmail(value);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (modalType === 'login') {
            console.log(loginFormData);
        } else if (modalType === 'register') {
            console.log(registerFormData);
        } else if (modalType === 'forgot password') {
            console.log(forgotPasswordEmail);
        }
    };

    return (
        <article className="modal-container">
            <section className="backdrop" onClick={onClose}></section>
            <section className="modal">
                <section className="modal__header">
                    {modalType === 'login' && (
                        <h2>Connexion</h2>
                    )}
                    {modalType === 'register' && (
                        <h2>Inscription</h2>
                    )}
                    {modalType === 'forgot password' && (
                        <h2>Mot de passe oublié</h2>
                    )}
                    <CloseIcon className='modal__header__close' onClick={onClose}/>
                </section>
                <section className="modal__body">
                    {modalType === 'login' && (
                        <form onSubmit={handleSubmit}>
                            <section className="input-container">
                                <label htmlFor="email">Adresse e-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@gmail.com"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={loginFormData.email}
                                    required
                                />
                            </section>
                            <section className="input-container">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Votre mot de passe..."
                                    name="password"
                                    onChange={handleInputChange}
                                    value={loginFormData.password}
                                    required
                                />
                            </section>
                            <section className="input-container">
                                <p onClick={() => setModalType('forgot password')}>Mot de passe oublié ?</p>
                                <section>
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        onChange={handleInputChange}
                                        value={loginFormData.rememberMe ? 'checked' : ''}
                                    />
                                    <label htmlFor="rememberMe">Rester connecté</label>
                                </section>
                            </section>
                            <button type="submit">Se connecter</button>
                        </form>
                    )}
                    {modalType === 'register' && (
                        <form onSubmit={handleSubmit}>
                            <section className="input-container">
                                <label htmlFor="email">Adresse e-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@gmail.com"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={registerFormData.email}
                                    required
                                />
                            </section>
                            <section className="input-container">
                                <label htmlFor="password-one">Mot de passe</label>
                                <input
                                    id="password-one"
                                    type="password"
                                    placeholder="Votre mot de passe..."
                                    name="password_one"
                                    onChange={handleInputChange}
                                    value={registerFormData.password_one}
                                    required
                                />
                            </section>
                            <section className="input-container">
                                <label htmlFor="password-two">Mot de passe</label>
                                <input
                                    id="password-two"
                                    type="password"
                                    placeholder="Confirmez votre mot de passe..."
                                    name="password_two"
                                    onChange={handleInputChange}
                                    value={registerFormData.password_two}
                                    required
                                />
                            </section>
                            <button type="submit">S'inscrire</button>
                        </form>
                    )}
                    {modalType === 'forgot password' && (
                        <form onSubmit={handleSubmit}>
                            <section className="input-container">
                                <label htmlFor="email">Adresse e-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@gmail.com"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={forgotPasswordEmail}
                                    required
                                />
                            </section>
                            <button type="submit">Continuer</button>
                            <button onClick={() => setModalType('login')}>Annuler</button>
                        </form>
                    )}
                </section>
                <section className="modal__footer">
                    {modalType === 'login' && (
                        <p>Vous n'avez pas de compte ? <span className="clickable" onClick={() => setModalType('register')}>Inscrivez-vous</span>.</p>
                    )}
                    {modalType === 'register' && (
                        <p>Déjà inscrit ? <span className="clickable" onClick={() => setModalType('login')}>Connectez-vous</span>.</p>
                    )}
                </section>
            </section>
        </article>
    );
};

export default AuthModal;
