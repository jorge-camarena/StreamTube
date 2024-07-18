import "../styles/Home.scss";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

interface Props {
    updateUserInfo: Function;
}

function Home({ updateUserInfo }: Props) {
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");

    const socketRef = useRef(socket);

    const navigate = useNavigate();

    const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        console.log();
    };
    const handleRoomName = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
        console.log(roomName);
    };
    const handleYoutubeLink = (event: ChangeEvent<HTMLInputElement>) => {
        setYoutubeLink(event.target.value);
        console.log(youtubeLink);
    };

    const handleCreateRoom = () => {
        socket.connect();
        socket.emit("create_room", username, roomName, youtubeLink);
    };

    const handleJoinRoom = () => {
        socket.connect();
        socket.emit("join_room", username, roomName);
    };

    useEffect(() => {
        socket.on("room_created", (username, room, youtubeLink) => {
            updateUserInfo(username, room, youtubeLink);
            socket.emit("init_session", username, room);
            navigate("/main");
        });
        return () => {
            socket.off("room_created");
        };
    }, []);

    useEffect(() => {
        socket.on("room_joined", (username, room, youtubeLink) => {
            console.log(username, room);
            updateUserInfo(username, room, youtubeLink);
            navigate("/main");
        });
        return () => {
            socket.off("room_joined");
        };
    }, []);

    return (
        <div className="main">
            <div className="signup">
                <label aria-hidden="true">Create Room</label>
                <input
                    type="text"
                    name="txt"
                    placeholder="User name"
                    required={false}
                    onChange={handleUserName}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Room Name"
                    required={false}
                    onChange={handleRoomName}
                />
                <input
                    type="text"
                    name="broj"
                    placeholder="Youtube Link"
                    required={false}
                    onChange={handleYoutubeLink}
                />

                <button onClick={handleCreateRoom}>Create Room</button>
                <h3>Or</h3>
                <label aria-hidden="true">Join Room</label>
                <input
                    type="text"
                    name="txt"
                    placeholder="User name"
                    required={false}
                    onChange={handleUserName}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Room Name"
                    required={false}
                    onChange={handleRoomName}
                />

                <button onClick={handleJoinRoom}>Join Room</button>
            </div>
        </div>
    );
}

export default Home;
