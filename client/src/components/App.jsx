import React, { useContext, useEffect } from 'react';

// components
import Login from './Login';

import ChatPage from './ChatPage';
//Global context
import { GlobalContext } from './GloablContext';

// assets
import logo from './assets/img/logoWhite.png';
const App = () => {
  const { authentication } = useContext(GlobalContext);

  useEffect(() => {
    console.log(authentication);

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
