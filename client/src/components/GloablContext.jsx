import React, { useEffect, createContext, useState } from 'react';
import api from './api';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);
  const [user, setuser] = useState({ userid: 0, name: '' });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log('user: ', user);
  }, [user]);

  async function Authenticate(email_pwd, id) {
    const user = await api.authenticate(email_pwd, id);
    if (user) {
      localStorage.setItem('email_pwd', email_pwd);
      setuser({
        mobile: user.mobile,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
      });
      setTimeout(() => setAuthentication(true));
    } else {
      enqueueSnackbar('Authentication failed', {
        variant: 'error',
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        persist: true,
        preventDuplicate: true,
        action: () => (
          <IconButton onClick={() => window.location.reload()}>
            <RefreshIcon />
          </IconButton>
        ),
      });
      setAuthentication(false);
    }

    return authentication;
  }
  return (
    <GlobalContext.Provider
      value={{
        authentication,
        Authenticate,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
