import React from 'react';
import { Modal } from '@mui/material';
import Signup from './Register';
import Login from './Login';
import { useLocation } from 'react-router-dom';
import './Auth.css';

const Auth_Modal = ({ handleClose, open }) => {
  const location = useLocation();

  return (
    <Modal open={open} onClose={handleClose}>
      <div className='auth-model'>
        {location.pathname === "/login" ? <Login handleClose={handleClose} /> : <Signup handleClose={handleClose} />}
      </div>
    </Modal>
  );
};

export default Auth_Modal;
