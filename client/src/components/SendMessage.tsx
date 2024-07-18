//import "bootstrap/dist/css/bootstrap.min.css";
import { useState, ChangeEvent, useEffect } from "react";
import { socket } from "../socket.js";
import { useUserContext } from "../context/DashboardContext.js";

interface Props {
    handleUpdateMessages: Function;
}

function SendMessage({ handleUpdateMessages }: Props) {
    useEffect(() => {
        socket.on("connection", () => console.log("connected"));
    }, []);

    const [message, setMessage] = useState("");
    const user = useUserContext();

    function handleMessage(event: ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
        console.log(message);
    }

    function sendMessage() {
        //This code snippet inserts the message into the DOM -- without sending it to websocket server
        handleUpdateMessages({
            position: "right",
            type: "text",
            title: user.username,
            text: message,
            date: new Date(),
        });
        setMessage("");

        //This code snippet sends the message t0 websocket server
        socket.emit("send_message", user.username, message, user.roomName);
    }

    return (
        <div className="input-group mb-3 send-form ">
            <input
                type="text"
                className="form-control"
                id="message-val"
                placeholder="Type message..."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={handleMessage}
                value={message}
            />
            <button
                className=" btn btn-outline-success"
                type="button"
                id="button-addon2"
                onClick={sendMessage}
            >
                Send Message
            </button>
        </div>
    );
}

export default SendMessage;
