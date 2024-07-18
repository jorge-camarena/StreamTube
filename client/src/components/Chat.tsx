import "react-chat-elements/dist/main.css";
import "../styles/Chat.scss";
import { createRef, useEffect, useRef, useState } from "react";
import { MessageList } from "react-chat-elements";
import SendMessage from "./SendMessage";
import { useUserContext } from "../context/DashboardContext";
import { socket } from "../socket";
const messageListReferance = createRef();

function Chat() {
    interface messageObject {
        position: string;
        type: string;
        title: string;
        titleColor?: string;
        text: string;
        date: Date;
    }
    const user = useUserContext();
    const [messageItems, setMessageItems] = useState<messageObject[]>([]);

    const socketRef = useRef(socket);
    //socketRef.current = socket;

    function handleReceiveMessage(message: messageObject) {
        setMessageItems((messageItems) => [...messageItems, message]);
    }

    useEffect(() => {
        socketRef.current.on("init_session_greetings", (username, room) => {
            console.log("greetings");
            const greetingsMessage = {
                position: "left",
                type: "text",
                title: "Chatbot",
                titleColor: "green",
                text: `Welcome ${username}, you are the admin of ${room}. Please press play when you're ready`,
                date: new Date(),
            };
            console.log(greetingsMessage);
            setMessageItems((messageItems) => [
                ...messageItems,
                greetingsMessage,
            ]);
        });
        return () => {
            socketRef.current.off("init_session_greetings");
        };
    }, []);

    useEffect(() => {
        socketRef.current.on("receive_message", (username, message) => {
            const messageObject = {
                position: "left",
                type: "text",
                title: username,
                text: message,
                date: new Date(),
            };
            setMessageItems((messageItems) => [...messageItems, messageObject]);
        });
        return () => {
            socketRef.current.off("receive_message");
        };
    }, []);

    useEffect(() => {
        socketRef.current.on("room_joined", (username, room, link) => {
            const messageObject = {
                position: "left",
                type: "text",
                title: "Chatbot",
                titleColor: "green",
                text: `${username} has joined, everyone say hi!`,
                date: new Date(),
            };
            setMessageItems((messageItems) => [...messageItems, messageObject]);
        });
        return () => {
            socket.off("room_joined");
        };
    }, []);

    return (
        <div className="chatbox-container">
            <h3>{user.roomName}</h3>
            <MessageList
                referance={messageListReferance}
                className="message-list"
                lockable={true}
                dataSource={messageItems}
            />
            <SendMessage handleUpdateMessages={handleReceiveMessage} />
        </div>
    );
}

export default Chat;
