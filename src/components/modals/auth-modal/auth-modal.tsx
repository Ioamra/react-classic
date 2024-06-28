import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../../assets/scss/layout/_modal.scss';
import './auth-modal.scss';
import InputText from '../../inputs/input-text/input-text';
import Checkbox from '../../inputs/checkbox/checkbox';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';

interface AuthModalProps {
    onClose: () => void,
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const emailPattern = "[a-z0-9]+@[a-z]+\.[a-z]{2,3}";
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

    const handleClickTOU = () => {
        navigate('/condition-generale-utilisation');
    }

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
                            <InputText
                                onChange={handleInputChange}
                                id="email"
                                name="email"
                                label="Adresse email"
                                value={loginFormData.email}
                                type="email"
                                required={true}
                                placeholder="exemple@gmail.com"
                                pattern={emailPattern}
                                errorMessage="Veuillez entrer une adresse email valide."
                            />
                            <InputText
                                onChange={handleInputChange}
                                id="password"
                                name="password"
                                label="Mot de passe"
                                value={loginFormData.password}
                                type="password"
                                required={true}
                                placeholder="Votre mot de passe..."
                            />
                            <p className="clickable" onClick={() => setModalType('forgot password')}>Mot de passe oublié ?</p>
                            <Checkbox
                                onChange={handleInputChange}
                                id="rememberMe"
                                name="rememberMe"
                                label="Rester connecté"
                                value={loginFormData.rememberMe ? "checked" : ""}
                                required={false}
                            />
                            <button className="btn btn--md btn--primary" type="submit">Se connecter</button>
                        </form>
                    )}
                    {modalType === 'register' && (
                        <form onSubmit={handleSubmit}>
                            <InputText
                                onChange={handleInputChange}
                                id="email"
                                name="email"
                                label="Adresse email"
                                value={registerFormData.email}
                                type="email"
                                required={true}
                                placeholder="exemple@gmail.com"
                                pattern={emailPattern}
                                errorMessage="Veuillez entrer une adresse email valide."
                            />
                            <InputText
                                onChange={handleInputChange}
                                id="password-one"
                                name="password-one"
                                label="Mot de passe"
                                value={registerFormData.password_one}
                                type="password"
                                required={true}
                                placeholder="Votre mot de passe..."
                            />
                            <InputText
                                onChange={handleInputChange}
                                id="password-two"
                                name="password-two"
                                label="Mot de passe"
                                value={registerFormData.password_two}
                                type="password"
                                required={true}
                                placeholder="Confirmez votre mot de passe..."
                            />
                            <p className="text-center">En créant un compte, vous acceptez les <span className="clickable" onClick={handleClickTOU}>conditions générale d'utilisation</span> de React-classic.</p>
                            <button className="btn btn--md btn--primary" type="submit">S'inscrire</button>
                        </form>
                    )}
                    {modalType === 'forgot password' && (
                        <form onSubmit={handleSubmit}>
                            <InputText
                                onChange={handleInputChange}
                                id="email"
                                name="email"
                                label="Adresse email"
                                value={forgotPasswordEmail}
                                type="email"
                                required={true}
                                placeholder="exemple@gmail.com"
                                pattern={emailPattern}
                                errorMessage="Veuillez entrer une adresse email valide."
                            />
                            <button className="btn btn--md btn--primary" type="submit">Continuer</button>
                            <button className="btn btn--md btn--gray" onClick={() => setModalType('login')}>Annuler</button>
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
