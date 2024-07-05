import React, { FormEvent, useState } from "react";
import { Tabs, Tab, Input, Link, Button, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { AuthModels } from "@/models/general/auth.models";
import { AuthService } from "@/services/general/auth.service";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTab: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, selectedTab }) => {
  const [state, setState] = React.useState<'login' | 'register' | 'forgot-password'>("login");
  const [loginForm, setLoginForm] = React.useState<AuthModels.ILoginRequest>({ email_users: '', password_users: '', rememberMe: false });
  const [registerForm, setRegisterForm] = React.useState<AuthModels.IRegisterForm>({ name_users: '', email_users: '', passwordOne: '', passwordTwo: '' });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [loginFormError, setLoginFormError] = React.useState<AuthModels.ILoginFormError>({ 
    email_users: { isInvalid: false, errorMessage: '' }, 
    password_users: { isInvalid: false, errorMessage: '' }, 
    rememberMe: { isInvalid: false, errorMessage: '' } 
  });
  const [registerFormError, setRegisterFormError] = React.useState<AuthModels.IRegisterFormError>({ 
    name_users: { isInvalid: false, errorMessage: '' }, 
    email_users: { isInvalid: false, errorMessage: '' }, 
    passwordOne: { isInvalid: false, errorMessage: '' }, 
    passwordTwo: { isInvalid: false, errorMessage: '' } 
  });
  const [forgotPasswordEmailError, setForgotPasswordEmailError] = useState({ isInvalid: false, errorMessage: '' });

  const validateEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    let isInvalid: boolean = false
    let errorMessage: string = '';
    if (state === 'login') {
      if (typeof value === 'string') {
        if (name === 'password_users' && value.length < 6)  {
          isInvalid = true;
          errorMessage = 'Veuillez entrer un mot de passe de plus de 6 caractères';
        }
      }
      if (typeof value === 'boolean') {

      }
      setLoginFormError(prevData => ({
        ...prevData,
        [name]: { isInvalid: isInvalid, errorMessage: errorMessage }
      }))
      setLoginForm(prevData => ({
        ...prevData,
        [name]: value
      }));
    } else if (state === 'register') {
      if (typeof value === 'string') {
        if (name === 'passwordOne' && value.length < 6)  {
          isInvalid = true;
          errorMessage = 'Veuillez entrer un mot de passe de plus de 6 caractères';
        }
        if (name === 'passwordTwo' && value.length < 6)  {
          isInvalid = true;
          errorMessage = 'Veuillez entrer un mot de passe de plus de 6 caractères';
        }
        if (name === 'passwordTwo' && registerForm.passwordOne !== value)  {
          isInvalid = true;
          errorMessage = 'Les mots de passe ne correspondent pas';
        }
      }
      setRegisterFormError(prevData => ({
        ...prevData,
        [name]: { isInvalid: isInvalid, errorMessage: errorMessage }
      }))
      setRegisterForm(prevData => ({
          ...prevData,
          [name]: value
      }));
    } else if (state === 'forgot-password') {
        setForgotPasswordEmail(value as string);
    }
  };

  const handleBlur = (name: string) => {
    let isInvalid: boolean = false
    let errorMessage: string = '';
    if (state === 'login') {
      if (name === 'email_users' && !validateEmail(loginForm.email_users))  {
        isInvalid = true;
        errorMessage = 'Veuillez entrer un email valide';
      }
      if (name === 'password_users' && loginForm.password_users.length < 6)  {
        isInvalid = true;
        errorMessage = 'Veuillez entrer un mot de passe de plus de 6 caractères';
      }
      setLoginFormError(prevData => ({
        ...prevData,
        [name]: { isInvalid: isInvalid, errorMessage: errorMessage },
      }))
    } else if (state === 'register') {
      if (name === 'name_users')  {
        isInvalid = true;
        errorMessage = 'Veuillez entrer un nom';
      }
      if (name === 'email_users' && !validateEmail(registerForm.email_users))  {
        isInvalid = true;
        errorMessage = 'Veuillez entrer un email valide';
      }
      if (name === 'passwordOne' && registerForm.passwordOne.length < 6)  {
        isInvalid = true;
        errorMessage = 'Veuillez entrer un mot de passe de plus de 6 caractères';
      }
      if (name === 'passwordTwo' && registerForm.passwordTwo.length < 6)  {
        isInvalid = true;
        errorMessage = 'Veuillez entrer un mot de passe de plus de 6 caractères';
      }
      if (name === 'passwordTwo' && registerForm.passwordOne !== registerForm.passwordTwo)  {
        isInvalid = true
        errorMessage = 'Les mots de passe ne correspondent pas';
      }
      setRegisterFormError(prevData => ({
        ...prevData,
        [name]: { isInvalid: isInvalid, errorMessage: errorMessage },
      }))
    } else if (state === 'forgot-password') {
      setForgotPasswordEmailError({ isInvalid: !validateEmail(forgotPasswordEmail), errorMessage: !validateEmail(forgotPasswordEmail) ? 'Veuillez entrer une addresse email valide' : '' })
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log('IIXIXI')
    event.preventDefault();
    if (state === 'login') {
      AuthService.login(loginForm).then(res => {
        console.log(res)
        switch (res.status) {
          case 200:
            localStorage.setItem('accessToken', res.data);
            onClose();
            break;
          case 400:
          
            break;
          default:
          
            break;
        }
      })
    } else if (state === 'register') {
      AuthService.register({ name_users: registerForm.name_users, email_users: registerForm.email_users, password_users: registerForm.passwordOne }).then(res => {
        console.log(res)
        switch (res.status) {
          case 200:
            localStorage.setItem('accessToken', res.data);
            onClose();
            break;
          case 400:
              
            break;
          default:

            break;
        }
      })
      console.log(registerForm);
    } else if (state === 'forgot-password') {
      console.log(forgotPasswordEmail);
    }
  };

  React.useEffect(() => {
    setState(selectedTab);
  }, [selectedTab]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {state === 'forgot-password' ? (
          <>
            <ModalHeader className="flex flex-col gap-1">Mot de passe oublié</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input 
                  isRequired 
                  size='sm' 
                  label="Email" 
                  type="email" 
                  onValueChange={(value) => handleInputChange('email_users', value)} 
                  onBlur={() => handleBlur('email_users')}
                  errorMessage={forgotPasswordEmailError.errorMessage}
                  isInvalid={forgotPasswordEmailError.isInvalid}
                />
                <div className="flex gap-2 justify-end">
                  <Button color="default" onClick={() => setState(('login'))}>
                    Retour
                  </Button>
                  <Button color="primary" type="submit">
                    Continuer
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={state}
                onSelectionChange={(key) => setState(key as 'login' | 'register')}
              >
                <Tab key="login" title="Connexion">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                      size='sm'
                      isRequired
                      label="Email"
                      type="email" 
                      onValueChange={(value) => handleInputChange('email_users', value)} 
                      onBlur={() => handleBlur('email_users')}
                      errorMessage={loginFormError.email_users.errorMessage}
                      isInvalid={loginFormError.email_users.isInvalid}
                    />
                    <Input 
                      size='sm' 
                      isRequired 
                      label="Password" 
                      type="password" 
                      onValueChange={(value) => handleInputChange('password_users', value)} 
                      onBlur={() => handleBlur('password_users')}
                      errorMessage={loginFormError.password_users.errorMessage}
                      isInvalid={loginFormError.password_users.isInvalid}
                    />
                    <p className="text-center text-small">
                      Vous n'avez pas de compte?{" "}
                      <Link size="sm" onPress={() => setState("register")}>
                      Inscrivez-vous
                      </Link>
                    </p>
                    <p className="text-center text-small">
                      <Link size="sm" onPress={() => setState("forgot-password")}>
                        Mot de passe oublié{" "}
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        Se connecter
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="register" title="Inscription">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input 
                      size='sm' 
                      isRequired 
                      label="Name" 
                      type="text" 
                      onValueChange={(value) => handleInputChange('name_users', value)} 
                      onBlur={() => handleBlur('name_users')}
                      errorMessage={registerFormError.name_users.errorMessage}
                      isInvalid={registerFormError.name_users.isInvalid}
                    />
                    <Input 
                      size='sm' 
                      isRequired 
                      label="Email" 
                      type="email" 
                      onValueChange={(value) => handleInputChange('email_users', value)} 
                      onBlur={() => handleBlur('email_users')}
                      errorMessage={registerFormError.email_users.errorMessage}
                      isInvalid={registerFormError.email_users.isInvalid}
                    />
                    <Input 
                      size='sm' 
                      isRequired 
                      label="Password" 
                      type="password" 
                      onValueChange={(value) => handleInputChange('passwordOne', value)} 
                      onBlur={() => handleBlur('passwordOne')}
                      errorMessage={registerFormError.passwordOne.errorMessage}
                      isInvalid={registerFormError.passwordOne.isInvalid}
                    />
                    <Input 
                      size='sm' 
                      isRequired 
                      label="Password" 
                      type="password" 
                      onValueChange={(value) => handleInputChange('passwordTwo', value)} 
                      onBlur={() => handleBlur('passwordTwo')}
                      errorMessage={registerFormError.passwordTwo.errorMessage}
                      isInvalid={registerFormError.passwordTwo.isInvalid}
                    />
                    <p className="text-center text-small">
                      Déjà inscrit?{" "}
                      <Link size="sm" onPress={() => setState("login")}>
                      Connectez-vous
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        S'inscrire
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AuthModal;