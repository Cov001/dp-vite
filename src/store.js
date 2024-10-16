import { toast } from "react-toastify";
import MsgNotifItem from "./components/MsgNotifItem";

export const initialState = {
  email: "",
  roomId: "",
  mediaStream: null,
  remoteStreams: [],
  screenSharingStream: null,
  socket: null,
  chat: [],
  showChatBox: false,
  user: {
    name: null,
    email: null,
    avatar: null,
    token: null,
    id: null,
  },
  screenLoading: false,
  openNav: true,
};

/*
  remote stream schema
  [
    {socketId, remoteStream}
  ]
*/

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CREDENTIALS":
      return {
        ...state,
        email: action.payload.email,
        roomId: action.payload.roomId,
        mediaStream: action.payload.mediaStream,
        // mediaStreamClone: action.payload.mediaStreamClone,
      };

    case "SET_REMOTE_STREAMS":
      // console.log("Remote stream", action.payload);
      return {
        ...state,
        remoteStreams: [...state.remoteStreams, action.payload],
      };

    case "REMOVE_REMOTE_STREAM":
      const newListOfRemoteStream = state.remoteStreams.filter(
        (streamContent) => {
          let streamPayload = null;
          if (
            streamContent.socketId !== action.payload.roomLeavingUserSocketId
          ) {
            streamPayload = streamContent;
          }
          return streamPayload;
        }
      );

      return {
        ...state,
        remoteStreams: newListOfRemoteStream,
      };

    case "END_CALL":
      return {
        ...state,
        email: "",
        roomId: "",
        mediaStream: null,
        remoteStreams: [],
        screenSharingStream: null,
        socket: null,
        chat: [],
      };

    case "SET_SOCKET_CONNECTION":
      return {
        ...state,
        socket: action.payload.socket,
      };

    case "SET_SCREEN_SHARING_STREAM":
      return {
        ...state,
        screenSharingStream: action.payload.screenSharingStream,
      };

    case "APPEND_MESSAGE":
      // logic to check if current message and previous message are from the same author

      if (!state.showChatBox) {
        toast(action.payload.msgData, {
          theme: "dark",
          autoClose: 3000,
          pauseOnHover: false,
          position: "bottom-right",
        });
      }

      const msgDataObj = { ...action.payload.msgData };

      if (isMessageFromSameAuthor(state.chat, action.payload.msgData)) {
        msgDataObj.fromSameAuthor = true;
      } else {
        msgDataObj.fromSameAuthor = false;
      }

      return {
        ...state,
        chat: [...state.chat, msgDataObj],
      };

    case "TOGGLE_CHAT_BOX":
      return {
        ...state,
        showChatBox: !state.showChatBox,
      };

    case "SET_REMOTE_USERNAME":
      const { username, remoteSocketId } = action.payload;

      const remoteUsers = state.remoteStreams.map((user) => {
        if (user.socketId === remoteSocketId) user.username = username;
      });

      return {
        ...state,
        remoteUsers: remoteUsers,
      };
    case "SET_SCREEN_LOADING":
      return {
        ...state,
        screenLoading: action.payload.isLoading,
      };
    case "SET_OPEN_NAV":
      return {
        ...state,
        openNav: action.payload.isLoading,
      };

    case "USER_LOGIN":
      const userData = {
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar,
        token: action.payload.token,
        id: action.payload.id,
      };
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      return {
        ...state,
        user: userData,
      };

    case "USER_LOGOUT":
      return {
        ...state,
        user: {
          name: null,
          email: null,
          avatar: null,
          token: null,
          id: null,
        },
      };

    default:
      return state;
  }
};

const isMessageFromSameAuthor = (chat, currMessage) => {
  if (!chat.length) return false;

  const latestMsg = chat[chat.length - 1];

  if (latestMsg.email === currMessage.email) return true;
};
