import React, { useState, useEffect, useContext } from 'react';

import MessagingWindow from './MessagingWindow';
//context
import { ChatContext, ChatContextProvider } from './ChatContext';
// Assets
import logo from './assets/img/logo.png';

// style
import './scss/chat-page.css';
import { GlobalContext } from './GloablContext';

import api from './api';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    /* padding: theme.spacing(3), */
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const ChatPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <ChatContextProvider>
      {/* <div className="chat-page">
        <Menu />
        <MessagingWindow />
      </div> */}
      <div className="chat-page">
        <div className={classes.root}>
          <CssBaseline />

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Menu drawer={{ set: setOpen, state: open }} />
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <MessagingWindow drawer={{ set: setOpen, state: open }} />
          </main>
        </div>
      </div>
    </ChatContextProvider>
  );
};

function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
}
const Menu = ({ drawer }) => {
  const [addconversationview, setaddconversationview] = useState(false);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    document.querySelector('.menu header').scrollIntoView();
  }, []);
  return (
    <>
      <div className="menu">
        <header>
          <img src={logo} alt="logo" />
          <h2>{user.first_name}</h2>
          <IconButton
            style={{ marginLeft: 'auto' }}
            onClick={() => drawer.set(!drawer.state)}
          >
            <ChevronLeftIcon />
          </IconButton>
        </header>

        <ConversationList />
        <Options setaddconversationview={setaddconversationview} />
      </div>
      {addconversationview && (
        <AddConversationDialog
          setaddconversationview={setaddconversationview}
        />
      )}
    </>
  );
};
const Options = ({ setaddconversationview }) => {
  return (
    <>
      <div className="menu-options">
        <div className="option" onClick={() => setaddconversationview(true)}>
          <img
            src="https://img.icons8.com/cotton/64/000000/add-to-chat.png"
            alt=""
          />
          <span>start chat</span>
        </div>
      </div>
    </>
  );
};

const ConversationList = () => {
  const { conversations } = useContext(ChatContext);

  /* useEffect(() => {
    updateConversations();
    // eslint-disable-next-line
  }, []); */

  if (conversations.length) {
    return (
      <div className="conversation-list">
        {conversations.map((conversation, i) => (
          <Conversation key={i} conversation={conversation} />
        ))}
      </div>
    );
  } else {
    return <div className="empty-conversation-list"></div>;
  }
};

const Conversation = ({ conversation }) => {
  const { user } = useContext(GlobalContext);
  const { openedconversation, setOpenedconversation, markRead } = useContext(
    ChatContext
  );

  const onclick = (e, group) => {
    // markRead(conversation.conversation_id);
    setTimeout(() => {
      document.querySelector('.messages-view').style.display = 'none';
      const messageInput = document.querySelector('.message-input textarea');
      messageInput.focus();
    });
    const conversation_opened = { ...conversation, group };

    window.localStorage.setItem(
      'openedconversation',
      JSON.stringify(conversation_opened)
    );

    setOpenedconversation(conversation_opened);
  };

  useEffect(() => {
    const opened_conversation = JSON.parse(
      window.localStorage.getItem('openedconversation')
    );
    if (
      opened_conversation &&
      conversation.conversation_id === opened_conversation.conversation_id
    ) {
      setTimeout(() => {
        document.querySelector('.messages-view').style.display = 'none';
        const messageInput = document.querySelector('.message-input textarea');
        messageInput.focus();
      });
      const conversation_opened = { ...conversation, group: false };

      setOpenedconversation(conversation_opened);
    }

    console.log(opened_conversation);
  }, [conversation, setOpenedconversation]);
  const indicator =
    conversation.unread &&
    !(conversation.conversation_id === openedconversation.conversation_id)
      ? '7px solid rgb(143, 255, 143)'
      : '';
  let conversation_name = conversation.conversation_name;

  if (Array.isArray(conversation_name)) {
    conversation_name = conversation_name
      .filter((name) => name !== user.first_name)
      .join(', ');
  }
  if (conversation.conversation.length === 2) {
    return (
      <div
        style={{ borderRight: indicator }}
        onClick={onclick}
        className="conversation"
        id={
          conversation.conversation_id === openedconversation.conversation_id
            ? 'opened-conversation'
            : ''
        }
      >
        <img
          src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png"
          alt="profile"
        />
        <div className="about">
          <h4>{conversation_name}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => {
          markRead(conversation.conversation_id);
          onclick(null, true);
          // setOpenedconversation({ ...conversation, group: true });
        }}
        className="conversation group-conversation"
        id={
          conversation.conversation_id === openedconversation.conversation_id
            ? 'opened-conversation'
            : ''
        }
      >
        <img
          src="https://img.icons8.com/color/48/000000/conference-skin-type-7.png"
          alt="group"
        />
        <div className="about">
          <h4>{conversation_name}</h4>
        </div>
      </div>
    );
  }
};

const AddConversationDialog = ({ setaddconversationview }) => {
  const [sugesstions, setsugesstions] = useState();
  const [participants, setparticipants] = useState();
  const { user, startconversation } = useContext(ChatContext);

  const addparticipant = (suggestion) => {
    let exists = false;
    participants &&
      participants.forEach((participant) => {
        if (participant) {
          if (participant.mobile === suggestion.mobile) exists = true;
        }
      });

    if (!exists) {
      setparticipants([...(participants || []), suggestion]);
    }
  };

  useEffect(() => {
    const input = document.querySelector('#conversation-adder');
    const conversationadd = document; //|| document.querySelector('.conversation-add');
    input.focus();
    const enteradd = (e) => {
      if (e.key === 'Enter' && sugesstions) {
        addparticipant(sugesstions[0]);
        e.preventDefault();
      }
    };
    const dismiss = (e) => {
      if (e.keyCode === 27) setaddconversationview(false);
    };

    input.addEventListener('keydown', enteradd);
    conversationadd.addEventListener('keydown', dismiss);

    return () => {
      conversationadd.removeEventListener('keydown', dismiss);
      input.removeEventListener('keydown', enteradd);
    };
  });

  const onchange = async (e) => {
    e.preventDefault();

    if (e.target.value !== '') {
      const s = await api.search(e.target.value);

      setsugesstions(s.filter((u) => u.mobile !== user.mobile));
    } else {
      setsugesstions([]);
    }
  };

  const removeparticipant = (suggestion) => {
    let newlist =
      participants &&
      participants.filter((participant) => {
        if (participant.mobile === suggestion.mobile) return false;
        return true;
      });

    setparticipants(newlist);
  };

  const start = async () => {
    startconversation(participants);
  };
  const dismiss = (e) => {
    if (e.target.className === 'conversation-add') {
      setaddconversationview(false);
    }
  };
  return (
    <div className="conversation-add" onClick={dismiss}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="users-input">
          <h2>Create</h2>
          {participants && participants.length !== 0 && (
            <div className="participants">
              {participants.map((participant, i) => (
                <div key={i} className="participant">
                  <span>{participant.first_name}</span>
                  <img
                    onClick={() => {
                      removeparticipant(participant);
                    }}
                    src="https://img.icons8.com/pastel-glyph/64/000000/cancel.png"
                    alt="cancel"
                  />
                </div>
              ))}
            </div>
          )}
          <input
            onChange={onchange}
            onSubmit={(e) => e.preventDefault()}
            id="conversation-adder"
            type="text"
            name="email/mobile"
            placeholder="email/mobile"
            required
            autoComplete="off"
          />

          {sugesstions && sugesstions.length !== 0 && (
            <div className="suggestions">
              {sugesstions.map((suggestion, i) => (
                <div
                  key={i}
                  onClick={() => addparticipant(suggestion)}
                  className="suggestion"
                >
                  <h4>{suggestion.first_name}</h4>
                  <p>{suggestion.mobile}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className={
            participants && participants.length ? '' : 'disabled-button'
          }
          onClick={start}
        >
          Start
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
