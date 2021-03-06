import React, { useContext, useEffect } from 'react';
// components
import Login from './Login';

import ChatPage from './ChatPage';
//Global context
import { GlobalContext } from './GloablContext';
// assets
import logo from './assets/img/logoWhite.png';

import Debugger from './Debugger';
const App = () => {
  const { authentication } = useContext(GlobalContext);

  useEffect(() => {
    if (authentication) {
      setTimeout(() => {
        const loader = document.querySelector('#intro-loader');
        loader.style.opacity = 0;
        loader.style.height = 0;
        loader.style.margin = 0;

        setTimeout(() => {
          const cover = document.querySelector('.intro-sequence');
          cover.style.opacity = 0;

          setTimeout(() => {
            cover.style.display = 'none';
          }, 600);
        }, 600);
      }, 2000);
    }
  }, [authentication]);

  useEffect(() => {
    if (window.localStorage.getItem('debug')) {
      Debugger();
    }
    const keypress = (e) => {
      if (e.key === 'd' && e.ctrlKey) {
        if (!window.localStorage.getItem('debug')) {
          Debugger();
        } else {
          window.localStorage.clear();
        }
      }
    };

    window.addEventListener('keypress', keypress);

    return () => window.removeEventListener('keypress', keypress);
  }, []);

  /* return (
    <div className="messages-container">
      <div className="message-view">
        <MessageBlock id="sender" />
        <MessageBlock />
      </div>
    </div>
  ); */
  return (
    <>
      {authentication ? <ChatPage /> : <Login />}
      <div className="intro-sequence">
        <img src={logo} alt="" />
        <div className="loader book" id="intro-loader">
          <figure className="page"></figure>
          <figure className="page"></figure>
          <figure className="page"></figure>
        </div>
      </div>
    </>
  );
};

export default App;
