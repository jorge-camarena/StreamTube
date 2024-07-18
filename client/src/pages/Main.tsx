import Chat from "../components/Chat.tsx";
import Video from "../components/Video.tsx";
import "../styles/Main.scss";

function Main() {
    return (
        <div>
            <div className="app-wrapper">
                <Video />
                <Chat />
            </div>
        </div>
    );
}

export default Main;
