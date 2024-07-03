import React, { useState } from 'react';
import { Modal, Button, Tabs, ModalHeader, ModalBody, ModalFooter, Tab, Input } from '@nextui-org/react';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose }) => {
  const [type, setType] = useState<'login' | 'signup' | 'forgotPassword'>('login');


    const login = (data: any) => {
        console.log(data)
    }

  return (
    <Modal isOpen={visible} onClose={onClose} size="md">
      <ModalHeader>
        <Tabs
          aria-label="AuthModalTabs"
        >
          <Tab key="login" title="Connexion" />
          <Tab key="signup" title="Inscription" />
        </Tabs>
      </ModalHeader>
      <ModalBody>
        {type === 'login' ? (
          <div>
            <h3>Connexion</h3>
            <form onSubmit={login}>
              <Input type="email" label="Email"></Input>
              <Input type="password" label="Mot de passe"></Input>
              <Button type="submit">Se connecter</Button>
            </form>
          </div>
        ) : (
          <div>
            <h3>Inscription</h3>
            <form>
              <div>
                <label htmlFor="signup-name">Nom</label>
                <input id="signup-name" type="text" placeholder="Entrez votre nom" required />
              </div>
              <div>
                <label htmlFor="signup-email">Email</label>
                <input id="signup-email" type="email" placeholder="Entrez votre email" required />
              </div>
              <div>
                <label htmlFor="signup-password">Mot de passe</label>
                <input id="signup-password" type="password" placeholder="Entrez votre mot de passe" required />
              </div>
              <Button type="submit">S'inscrire</Button>
            </form>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onClose}>
          Fermer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AuthModal;
