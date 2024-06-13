import "../styles/Home.scss";
import { useState, ChangeEvent } from "react";

function Home() {
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");

    const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        console.log(username);
    };
    const handleRoomName = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
        console.log(roomName);
    };
    const handleYoutubeLink = (event: ChangeEvent<HTMLInputElement>) => {
        setYoutubeLink(event.target.value);
        console.log(youtubeLink);
    };

    return (
        <div className="main">
            <div className="signup">
                <form>
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

                    <button>Create Room</button>
                    <h3>Or</h3>
                    <label aria-hidden="true">Join Room</label>
                    <input
                        type="text"
                        name="txt"
                        placeholder="User name"
                        required={false}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Room Name"
                        required={false}
                    />

                    <button>Join Room</button>
                </form>
            </div>

            {/* <div className="login">
                <form>
                    <label aria-hidden="true">Login</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required={false}
                    />
                    <input
                        type="password"
                        name="pswd"
                        placeholder="Password"
                        required={false}
                    />
                    <button>Login</button>
                </form>
            </div> */}
        </div>
    );
}

export default Home;
