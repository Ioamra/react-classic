import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './old-auth-modal.scss';
import InputText from '../../inputs/old-input-text/old-input-text';
import Checkbox from '../../inputs/checkbox/checkbox';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';
import { login } from '../../../services/general/auth.service';
import { AuthModels } from '../../../models/general/auth.models';
import TimedAlert from '../../alerts/timed-alert/timed-alert';
import { AlertModels } from '../../../models/general/alert.models';

interface AuthModalProps {
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const emailPattern = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';
    const passwordPattern = '^.{6,}$';
    const [modalType, setModalType] = useState<'login' | 'register' | 'forgotPassword' >('login');
    const [loginFormData, setLoginFormData] = useState({
        email_users: 'admin@gmail.com',
        password_users: 'azerty',
        rememberMe: false
    });
    const [registerFormData, setRegisterFormData] = useState({
        email_users: '',
        passwordOne: '',
        passwordTwo: ''
    });
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
    const [allError, setAllError] = useState<AuthModels.IFormErrors>({
        login: { email_users: true, password_users: true },
        register: { email_users: true, passwordOne: true, passwordTwo: true, passwordMatch: true },
        forgotPassword: { forgotPassword: true },
    });
    const [alert, setAlert] = useState<AlertModels.ITimedAlert>({
        show: false,
        type: 'error',
        message: '',
        duration: 0
    });
    const [errorAfterSubmit, setErrorAfterSubmit] = useState({
        show: false,
        message: ''
    })
                        
    const handleShowAlert = () => {
        setAlert(alert => ({
            ...alert,
            ['show']: true
        }));
    };

    const handleCloseAlert = () => {
        setAlert(alert => ({
            ...alert,
            ['show']: false
        }));
    };

    const checkPasswordMatch = () => {
        const error = registerFormData.passwordOne !== registerFormData.passwordTwo;
        handleError('register', 'passwordMatch', error);
    };

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
            if (name === 'passwordOne' || name === 'passwordTwo') {
                checkPasswordMatch();
            }
        } else if (modalType === 'forgotPassword') {
            setForgotPasswordEmail(value);
        }
    };

    const handleError = <T extends AuthModels.IFormType>(formType: T, fieldName: AuthModels.IFieldType<AuthModels.IFormErrors[T]>, error: boolean) => {
        setAllError(prevErrors => ({
            ...prevErrors,
            [formType]: {
                ...prevErrors[formType],
                [fieldName]: error,
            },
        }));
    };

    const hasErrors = () => {
        const formErrors = allError[modalType];
        return Object.values(formErrors).some(error => error);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (modalType === 'login') {
            login(loginFormData).then(res => {
                console.log(res)
                switch (res.status) {
                    case 200:
                        localStorage.setItem('accessToken', res.data);
                        onClose();
                        break;
                    case 400:
                        setErrorAfterSubmit({
                            show: true,
                            message: 'Identifiant ou mot de passe incorrect.'
                        });
                        break;
                    default:
                        setAlert({
                            show: true,
                            type: 'error',
                            message: 'Une erreur est survenue.',
                            duration: 7500 
                        });
                        handleShowAlert();
                        break;
                }
            })
        } else if (modalType === 'register') {
            console.log(registerFormData);
        } else if (modalType === 'forgotPassword') {
            console.log(forgotPasswordEmail);
        }
    };

    const handleClickTOU = () => {
        navigate('/condition-generale-utilisation');
    }
    
    useEffect(() => {
        const error = registerFormData.passwordOne !== registerFormData.passwordTwo;
        handleError('register', 'passwordMatch', error);
    }, [registerFormData.passwordOne, registerFormData.passwordTwo]);

    return (
        <article className='modal-container'>
            <section className='backdrop' onClick={onClose}></section>
            {alert.show && (
                <TimedAlert
                    type={alert.type}
                    message={alert.message}
                    duration={alert.duration}
                    onClose={handleCloseAlert}
                />
            )}
            <section className='modal'>
                <section className='modal__header'>
                    {modalType === 'login' && (
                        <h2>Connexion</h2>
                    )}
                    {modalType === 'register' && (
                        <h2>Inscription</h2>
                    )}
                    {modalType === 'forgotPassword' && (
                        <h2>Mot de passe oublié</h2>
                    )}
                    <CloseIcon className='modal__header__close' onClick={onClose}/>
                </section>
                <section className='modal__body'>
                    {modalType === 'login' && (
                        <form onSubmit={handleSubmit}>
                            <InputText
                                onChange={handleInputChange}
                                onError={(error) => handleError('login', 'email_users', error)}
                                id='email_users'
                                name='email_users'
                                label='Adresse email'
                                value={loginFormData.email_users}
                                type='email'
                                required={true}
                                placeholder='exemple@gmail.com'
                                pattern={emailPattern}
                                errorMessage='Veuillez entrer une adresse email valide.'
                            />
                            <InputText
                                onChange={handleInputChange}
                                onError={(error) => handleError('login', 'password_users', error)}
                                id='password_users'
                                name='password_users'
                                label='Mot de passe'
                                value={loginFormData.password_users}
                                type='password'
                                required={true}
                                placeholder='Votre mot de passe...'
                                pattern={passwordPattern}
                                errorMessage="Veuillez entrer un mot de passe d'au moins 6 caractère"
                            />
                            {errorAfterSubmit.show && (
                                <p className='error-message text--md error-500'>{errorAfterSubmit.message}</p>
                            )}
                            <p className='clickable text--md' onClick={() => setModalType('forgotPassword')}>Mot de passe oublié ?</p>
                            <Checkbox
                                onChange={handleInputChange}
                                id='rememberMe'
                                name='rememberMe'
                                label='Rester connecté'
                                value={loginFormData.rememberMe ? 'checked' : ''}
                                required={false}
                            />
                            <button className='btn btn--md btn--primary btn--modal-size' type='submit' disabled={hasErrors()}>Se connecter</button>
                        </form>
                    )}
                    {modalType === 'register' && (
                        <form onSubmit={handleSubmit}>
                            <InputText
                                onChange={handleInputChange}
                                onError={(error) => handleError('register', 'email_users', error)}
                                id='email_users'
                                name='email_users'
                                label='Adresse email'
                                value={registerFormData.email_users}
                                type='email'
                                required={true}
                                placeholder='exemple@gmail.com'
                                pattern={emailPattern}
                                errorMessage='Veuillez entrer une adresse email valide.'
                            />
                            <InputText
                                onChange={handleInputChange}
                                onError={(error) => handleError('register', 'passwordOne', error)}
                                id='passwordOne'
                                name='passwordOne'
                                label='Mot de passe'
                                value={registerFormData.passwordOne}
                                type='password'
                                required={true}
                                placeholder='Au moins 6 caractères'
                                pattern={passwordPattern}
                                errorMessage="Veuillez entrer un mot de passe d'au moins 6 caractère"
                            />
                            <InputText
                                onChange={handleInputChange}
                                id='passwordTwo'
                                name='passwordTwo'
                                onError={(error) => handleError('register', 'passwordTwo', error)}
                                label='Entrez le mot de passe à nouveau'
                                value={registerFormData.passwordTwo}
                                type='password'
                                required={true}
                                pattern={passwordPattern}
                                errorMessage="Veuillez entrer un mot de passe d'au moins 6 caractère"
                            />
                            {allError.register.passwordMatch && !allError.register.passwordOne && !allError.register.passwordTwo && (
                                <span className='error-message text--sm error-500'>Les mots de passe ne correspondent pas.</span>
                            )}
                            {errorAfterSubmit.show && (
                                <p className='error-message text--md error-500'>{errorAfterSubmit.message}</p>
                            )}
                            <p className='text-center text--md'>En créant un compte, vous acceptez les <span className='clickable' onClick={handleClickTOU}>conditions générale d'utilisation</span> de React-classic.</p>
                            <button className='btn btn--md btn--primary btn--modal-size' type='submit' disabled={hasErrors()}>S'inscrire</button>
                        </form>
                    )}
                    {modalType === 'forgotPassword' && (
                        <form onSubmit={handleSubmit}>
                            <InputText
                                onChange={handleInputChange}
                                onError={(error) => handleError('forgotPassword', 'forgotPassword', error)}
                                id='email_users'
                                name='email_users'
                                label='Adresse email'
                                value={forgotPasswordEmail}
                                type='email'
                                required={true}
                                placeholder='exemple@gmail.com'
                                pattern={emailPattern}
                                errorMessage='Veuillez entrer une adresse email valide.'
                            />
                            <button className='btn btn--md btn--primary btn--modal-size' type='submit' disabled={hasErrors()}>Continuer</button>
                            <button className='btn btn--md btn--gray btn--modal-size' onClick={() => setModalType('login')}>Annuler</button>
                        </form>
                    )}
                </section>
                <section className='modal__footer'>
                    {modalType === 'login' && (
                        <p>Vous n'avez pas de compte ? <span className='clickable text--md' onClick={() => setModalType('register')}>Inscrivez-vous</span>.</p>
                    )}
                    {modalType === 'register' && (
                        <p>Déjà inscrit ? <span className='clickable text--md' onClick={() => setModalType('login')}>Connectez-vous</span>.</p>
                    )}
                </section>
            </section>
        </article>
    );
};

export default AuthModal;
