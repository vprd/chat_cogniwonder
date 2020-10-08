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
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
/* import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail'; */
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FlipMove from 'react-flip-move';
const drawerWidth = 252;

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
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(GlobalContext);
  useEffect(() => {
    setTimeout(() => {
      try {
        if (user.mobile) setOpen(true);
      } catch (error) {
        console.log('failed to open drawer');
      }
    }, 3000);
  }, [user]);

  return (
    <ChatContextProvider maxSnack={3}>
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

const Menu = ({ drawer }) => {
  const [addconversationview, setaddconversationview] = useState(false);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    // document.querySelector('.menu header').scrollIntoView();
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
  // const conversations = false;

  if (Array.isArray(conversations) && !conversations.length) {
    return (
      <div className="empty-conversation-list">you have no conversations</div>
    );
  }
  return (
    <>
      {conversations.length ? (
        <FlipMove className="conversation-list" duration={4000}>
          <>
            {conversations.map((conversation, i) => (
              <Conversation key={i} conversation={conversation} />
            ))}
          </>
        </FlipMove>
      ) : (
        <div className="empty-conversation-list">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

const Conversation = ({ conversation }) => {
  const { user } = useContext(GlobalContext);
  const {
    openedconversation,
    setOpenedconversation,
    markRead,

    setMessagesLoad,
  } = useContext(ChatContext);

  const onclick = () => {
    // markRead(conversation.conversation_id);
    setTimeout(() => {
      document.querySelector('.messages-view').style.opacity = '0';
      setMessagesLoad(true);
      const messageInput = document.querySelector('.message-input textarea');
      messageInput.focus();
    }, 100);
    // const conversation_opened = { ...conversation, group };

    setOpenedconversation(conversation);
  };

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
  if (conversation.display_name) conversation_name = conversation.display_name;
  if (conversation.conversation.length === 2) {
    return (
      <Button
        style={{ borderRight: indicator, textTransform: 'none' }}
        onClick={onclick}
        className={`conversation conversation${conversation.conversation_id}`}
        data-conversationid={conversation.conversation_id}
        id={
          conversation.conversation_id === openedconversation.conversation_id
            ? 'opened-conversation'
            : ''
        }
      >
        <Avatar>{conversation_name[0]}</Avatar>
        <div className="about">
          <h4>{conversation_name}</h4>
        </div>
      </Button>
    );
  } else {
    return (
      <Button
        style={{ textTransform: 'none' }}
        onClick={() => {
          markRead(conversation.conversation_id);
          onclick(null, true);
          // setOpenedconversation({ ...conversation, group: true });
        }}
        className={`conversation group-conversation conversation${conversation.conversation_id}`}
        id={
          conversation.conversation_id === openedconversation.conversation_id
            ? 'opened-conversation'
            : ''
        }
      >
        <AvatarGroup max={3} spacing="small">
          {conversation.conversation_name.map((name, i) => {
            return <Avatar key={i}>{name[0]}</Avatar>;
          })}
        </AvatarGroup>
        {/* <Avatar
          src="https://img.icons8.com/color/48/000000/conference-skin-type-7.png"
          alt="group"
        /> */}
        <div className="about">
          <h4>{conversation_name}</h4>
        </div>
      </Button>
    );
  }
};

function AddConversationDialog2() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const AddConversationDialog = ({ setaddconversationview }) => {
  const [sugesstions, setsugesstions] = useState([]);
  const [participants, setparticipants] = useState([]);
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
    /* const input = document.querySelector('#conversation-adder');
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
    }; */
  });

  const onchange = async (e) => {
    e.persist();

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

  const dismiss = (e) => {
    setaddconversationview(false);
  };
  const start = async () => {
    dismiss();
    startconversation(participants);
  };

  return (
    <Dialog className="conversation-add" open={true} onClose={dismiss}>
      <DialogContent>
        <div className="users-input">
          <h2>Create</h2>
          {participants && participants.length !== 0 && (
            <div className="participants">
              {participants.map((participant, i) => (
                <Chip
                  style={{ margin: '4px' }}
                  key={i}
                  icon={
                    <Avatar style={{ width: '22px', height: '22px' }}>
                      {participant.first_name[0]}
                    </Avatar>
                  }
                  label={participant.first_name}
                  onDelete={() => {
                    removeparticipant(participant);
                  }}
                  variant="outlined"
                />
              ))}
            </div>
          )}
          <TextField
            onChange={onchange}
            onSubmit={(e) => e.preventDefault()}
            id="conversation-adder"
            type="text"
            name="email/mobile"
            placeholder="email/mobile"
            required
            autoComplete="off"
            autoFocus
            margin="dense"
            // id="name"
            // label="Email Address"
            // type="email"
            fullWidth
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
      </DialogContent>
      <DialogActions>
        <Button onClick={dismiss}>cancel</Button>
        <Button disabled={!participants.length} onClick={start}>
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatPage;
